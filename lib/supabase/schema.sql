-- Categories
create table if not exists categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  icon text not null,
  description text,
  image text,
  col_span text,
  created_at timestamptz default now()
);

-- Products
create table if not exists products (
  id text primary key,
  slug text not null unique,
  name text not null,
  brand text not null,
  category text not null references categories(id),
  unit text not null,
  price numeric not null,
  compare_at_price numeric,
  description text,
  in_stock boolean default true,
  is_featured boolean default false,
  image text default '',
  rating numeric,
  reviews integer,
  created_at timestamptz default now()
);

-- Profiles (auto-created on signup)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  status text not null default 'pending',
  total numeric not null,
  created_at timestamptz default now()
);

-- Order items
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id text not null references products(id),
  quantity integer not null,
  unit_price numeric not null
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- RLS
alter table categories enable row level security;
alter table products enable row level security;
alter table profiles enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Public read for catalog
create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (true);

-- Profiles: owner only
create policy "Own profile" on profiles for all using (auth.uid() = id);

-- Orders: owner only
create policy "Own orders" on orders for all using (auth.uid() = user_id);
create policy "Own order items" on order_items for all
  using (exists (select 1 from orders where orders.id = order_id and orders.user_id = auth.uid()));
