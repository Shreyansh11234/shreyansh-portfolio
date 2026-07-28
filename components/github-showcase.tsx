"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Star, GitCommitHorizontal, ExternalLink } from "lucide-react";

type GitHubUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  name: string | null;
  avatar_url: string;
  html_url: string;
};

type Repo = {
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export function GitHubShowcase() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "Shreyansh11234";
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const [u, r] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`).then((res) => res.json()),
          fetch(`https://api.github.com/users/${username}/repos?per_page=6&sort=updated`).then((res) => res.json())
        ]);
        setUser(u);
        setRepos(Array.isArray(r) ? r : []);
      } catch {
        // keep the section functional even if the API is rate-limited
      }
    };
    load();
  }, [username]);

  const activity = useMemo(() => {
    return Array.from({ length: 56 }, (_, i) => (Math.sin(i * 0.5) + 1) / 2);
  }, []);

  return (
    <section id="github" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Badge className="mb-4">GitHub</Badge>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Image
                src={user?.avatar_url ?? `https://avatars.githubusercontent.com/${username}`}
                alt="GitHub avatar"
                width={64}
                height={64}
                className="h-16 w-16 rounded-3xl border border-white/10 object-cover"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/35">Auto-fetched</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">{user?.name ?? "Shreyansh Kumar Rao"}</h3>
                <a href={user?.html_url ?? `https://github.com/${username}`} className="mt-1 inline-flex items-center gap-2 text-sm text-white/60" target="_blank" rel="noreferrer">
                  @{username} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                ["Repos", user?.public_repos ?? "--"],
                ["Followers", user?.followers ?? "--"],
                ["Following", user?.following ?? "--"]
              ].map(([label, value]) => (
                <div key={label as string} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-white/40">{label as string}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{value as string | number}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-medium text-white">Public activity map</p>
              <p className="mt-2 text-sm leading-7 text-white/60">
                Rendered as a visual grid from profile activity styling. Replace this with a tokenized contribution service if you want exact contribution counts.
              </p>

              <div className="mt-4 grid grid-cols-8 gap-1.5 sm:grid-cols-14">
                {activity.map((v, i) => (
                  <span
                    key={i}
                    className="aspect-square rounded-[6px] border border-white/8"
                    style={mounted ? { backgroundColor: `rgba(123, 166, 255, ${(0.12 + v * 0.55).toFixed(3)})` } : undefined}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {repos.slice(0, 4).map((repo) => (
            <Card key={repo.name}>
              <CardContent className="flex items-center justify-between gap-4 p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-white/45" />
                    <h3 className="font-semibold text-white">{repo.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-white/55">
                    {repo.language ?? "Code"} - updated {new Date(repo.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/65">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4" /> {repo.stargazers_count}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitCommitHorizontal className="h-4 w-4" /> {repo.forks_count}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
