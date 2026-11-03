-- Run once in Supabase → SQL Editor.
create table if not exists public.progress (
  user_id uuid primary key references auth.users on delete cascade,
  state jsonb not null,
  updated_at timestamptz default now()
);

-- Row Level Security: each signed-in user can only see and change their own row.
alter table public.progress enable row level security;

drop policy if exists "Users manage their own progress" on public.progress;
create policy "Users manage their own progress" on public.progress
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Nobody who isn't signed in can touch the table at all.
revoke all on public.progress from anon;
