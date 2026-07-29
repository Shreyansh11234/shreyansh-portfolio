"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Star, GitCommitHorizontal, ExternalLink, AlertCircle, RefreshCw } from "lucide-react";

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

type ContributionDay = {
  count: number;
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionWeek = ContributionDay[];

type ContributionData = {
  total: number;
  weeks: ContributionWeek[];
};

type Status = "idle" | "loading" | "success" | "error";

  const LEVEL_COLORS: Record<number, string> = {
    0: "bg-white/[0.04] border-white/6",
    1: "bg-[#1a3a5c] border-[#1a3a5c]/60",
    2: "bg-[#2a7a99] border-[#2a7a99]/60",
    3: "bg-[#4fd1ff] border-[#4fd1ff]/60",
    4: "bg-[#7adaff] border-[#7adaff]/60",
  };

let cache: { user: GitHubUser; repos: Repo[] } | null = null;
let contributionsCache: ContributionData | null = null;

export function GitHubShowcase() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "Shreyansh11234";
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [userStatus, setUserStatus] = useState<Status>("idle");
  const [contributions, setContributions] = useState<ContributionData | null>(null);
  const [contribStatus, setContribStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (cache) {
      setUser(cache.user);
      setRepos(cache.repos);
      setUserStatus("success");
      return;
    }

    setUserStatus("loading");
    const load = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (res.status === 403 || res.status === 429) {
          throw new Error("GitHub API rate limit exceeded. Try again later.");
        }
        if (!res.ok) throw new Error(`GitHub API error (${res.status})`);
        const u: GitHubUser = await res.json();

        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=6&sort=updated`
        );
        const r: Repo[] = repoRes.ok ? await repoRes.json() : [];

        if (!mountedRef.current) return;
        cache = { user: u, repos: Array.isArray(r) ? r : [] };
        setUser(u);
        setRepos(Array.isArray(r) ? r : []);
        setUserStatus("success");
      } catch (err) {
        if (!mountedRef.current) return;
        setUserStatus("error");
        setErrorMsg(err instanceof Error ? err.message : "Failed to load GitHub data");
      }
    };
    load();
  }, [username]);

  useEffect(() => {
    if (contributionsCache) {
      setContributions(contributionsCache);
      setContribStatus("success");
      return;
    }

    setContribStatus("loading");
    const load = async () => {
      try {
        const year = new Date().getFullYear();
        const res = await fetch(
          `https://github-contributions-api.deno.dev/api/${username}?year=${year}`
        );
        if (!res.ok) throw new Error("Failed to load contributions");
        const data = await res.json();
        if (!mountedRef.current) return;
        const formatted: ContributionData = {
          total: data.totalContributions ?? 0,
          weeks: (data.contributions ?? []).map((w: { weeks?: ContributionDay[]; days?: ContributionDay[] }) =>
            (w.weeks ?? w.days ?? []).map((d: ContributionDay) => ({
              count: d.count ?? 0,
              date: d.date ?? "",
              level: (d.level ?? 0) as 0 | 1 | 2 | 3 | 4,
            }))
          ),
        };
        contributionsCache = formatted;
        setContributions(formatted);
        setContribStatus("success");
      } catch {
        if (!mountedRef.current) return;
        setContribStatus("error");
      }
    };
    load();
  }, [username]);

  const today = new Date();
  const weekDays = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <section id="github" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Badge className="mb-4">GitHub</Badge>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {userStatus === "loading" ? (
                <>
                  <div className="h-16 w-16 flex-shrink-0 animate-pulse rounded-3xl bg-white/8" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-24 animate-pulse rounded-full bg-white/8" />
                    <div className="h-5 w-40 animate-pulse rounded-full bg-white/8" />
                    <div className="h-3 w-28 animate-pulse rounded-full bg-white/8" />
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={user?.avatar_url ?? `https://avatars.githubusercontent.com/${username}`}
                    alt={`GitHub profile picture for ${username}`}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-3xl border border-white/10 object-cover"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/35">GitHub</p>
                    <h3 className="mt-1 text-2xl font-semibold text-white">
                      {user?.name ?? "Shreyansh Kumar Rao"}
                    </h3>
                    <a
                      href={user?.html_url ?? `https://github.com/${username}`}
                      className="mt-1 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`GitHub profile for ${username}`}
                    >
                      @{username} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {(
                [
                  ["Repos", user?.public_repos],
                  ["Followers", user?.followers],
                  ["Following", user?.following],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <p className="text-xs text-white/40">{label}</p>
                  {userStatus === "loading" ? (
                    <div className="mt-2 h-7 w-12 animate-pulse rounded bg-white/8" />
                  ) : (
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {userStatus === "error" ? "—" : (value ?? "—")}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Contribution Matrix</p>
                {contribStatus === "loading" && (
                  <div className="h-4 w-20 animate-pulse rounded bg-white/8" />
                )}
                {contribStatus === "success" && contributions && (
                  <p className="text-xs text-white/45">
                    {contributions.total.toLocaleString()} contributions this year
                  </p>
                )}
              </div>

              {contribStatus === "error" && (
                <p className="mt-3 text-xs text-white/40">
                  Contribution data unavailable
                </p>
              )}

              {userStatus === "error" && (
                <div className="mt-3 flex items-center gap-2 rounded-2xl border border-red/10 bg-red/[0.04] p-3">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 text-red" />
                  <p className="text-xs text-white/50">{errorMsg}</p>
                </div>
              )}

              <div
                className="mt-4 overflow-x-auto pb-1"
                role="img"
                aria-label={
                  contributions
                    ? `GitHub contribution graph: ${contributions.total} contributions in the past year`
                    : "GitHub contribution graph"
                }
              >
                <div className="flex gap-[3px]">
                  {contribStatus === "loading" ? (
                    Array.from({ length: 53 }).map((_, w) => (
                      <div key={w} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }).map((_, d) => (
                          <div
                            key={d}
                            className="h-[10px] w-[10px] animate-pulse rounded-[3px] bg-white/8"
                          />
                        ))}
                      </div>
                    ))
                  ) : contributions?.weeks?.length ? (
                    contributions.weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[3px]">
                        {week.map((day, di) => (
                          <span
                            key={di}
                            className={`h-[10px] w-[10px] rounded-[3px] border ${LEVEL_COLORS[day.level]}`}
                            title={`${day.count} contributions on ${day.date}`}
                          />
                        ))}
                      </div>
                    ))
                  ) : contribStatus === "error" ? (
                    <div className="flex items-center gap-2 text-xs text-white/35">
                      <RefreshCw className="h-3 w-3" />
                      Could not load contribution data
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4" role="list" aria-label="Recent repositories">
          {repos.slice(0, 4).map((repo) => (
            <Card key={repo.name} role="listitem">
              <CardContent className="flex items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 flex-shrink-0 text-white/45" />
                    <h3 className="truncate font-semibold text-white">{repo.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-white/55">
                    {repo.language ?? "Code"} &middot; updated{" "}
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-3 text-sm text-white/65">
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
          {userStatus === "loading" &&
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={`skeleton-${i}`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-pulse rounded bg-white/8" />
                    <div className="h-4 w-32 animate-pulse rounded bg-white/8" />
                  </div>
                  <div className="mt-2 h-3 w-48 animate-pulse rounded bg-white/8" />
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
