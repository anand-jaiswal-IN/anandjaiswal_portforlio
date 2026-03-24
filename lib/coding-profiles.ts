export type CodingPlatform = "LeetCode" | "CodeChef" | "Codeforces" | "HackerRank"

export type CodingProfileStat = {
  platform: CodingPlatform
  username: string
  profileUrl: string
  score: string
  rating: string
  badges: string
  status: "ok" | "error"
  error?: string
}

export type CodingProfilesResponse = {
  generatedAt: string
  profiles: CodingProfileStat[]
}

const PROFILE_CONFIG = {
  leetcode: {
    username: "anandjaiswal_in",
    profileUrl: "https://leetcode.com/u/anandjaiswal_in/",
  },
  codechef: {
    username: "anandjaiswal68",
    profileUrl: "https://www.codechef.com/users/anandjaiswal68",
  },
  codeforces: {
    username: "anandjaiswal_in",
    profileUrl: "https://codeforces.com/profile/anandjaiswal_in",
  },
  hackerrank: {
    username: "anandjaiswal_in",
    profileUrl: "https://www.hackerrank.com/profile/anandjaiswal_in",
  },
}

async function fetchWithTimeout(url: string, init?: RequestInit, timeoutMs = 12000): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        "User-Agent": "anandjaiswal-portfolio/1.0",
        ...(init?.headers || {}),
      },
      next: { revalidate: 3600 },
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

function asErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return "Unknown error"
}

async function getLeetCodeStats(): Promise<CodingProfileStat> {
  const { username, profileUrl } = PROFILE_CONFIG.leetcode

  try {
    const response = await fetchWithTimeout("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query:
          "query userProfile($username: String!) { matchedUser(username: $username) { submitStatsGlobal { acSubmissionNum { difficulty count } } badges { id } } userContestRanking(username: $username) { rating } }",
        variables: { username },
      }),
    })

    if (!response.ok) {
      throw new Error(`LeetCode request failed (${response.status})`)
    }

    const data = await response.json()
    const matchedUser = data?.data?.matchedUser
    const contest = data?.data?.userContestRanking

    const solvedList = matchedUser?.submitStatsGlobal?.acSubmissionNum || []
    const totalSolved = solvedList.find((item: { difficulty: string; count: number }) => item.difficulty === "All")?.count
    const rating = contest?.rating
    const badgesCount = matchedUser?.badges?.length ?? 0

    return {
      platform: "LeetCode",
      username,
      profileUrl,
      score: totalSolved ? `${totalSolved} solved` : "No solved data",
      rating: rating ? `${Math.round(rating)} contest rating` : "No contest rating",
      badges: `${badgesCount} badges`,
      status: "ok",
    }
  } catch (error) {
    return {
      platform: "LeetCode",
      username,
      profileUrl,
      score: "Unavailable",
      rating: "Unavailable",
      badges: "Unavailable",
      status: "error",
      error: asErrorMessage(error),
    }
  }
}

async function getCodeforcesStats(): Promise<CodingProfileStat> {
  const { username, profileUrl } = PROFILE_CONFIG.codeforces

  try {
    const [infoRes, historyRes] = await Promise.all([
      fetchWithTimeout(`https://codeforces.com/api/user.info?handles=${username}`),
      fetchWithTimeout(`https://codeforces.com/api/user.rating?handle=${username}`),
    ])

    if (!infoRes.ok) {
      throw new Error(`Codeforces user.info failed (${infoRes.status})`)
    }
    if (!historyRes.ok) {
      throw new Error(`Codeforces user.rating failed (${historyRes.status})`)
    }

    const infoJson = await infoRes.json()
    const historyJson = await historyRes.json()

    const user = infoJson?.result?.[0]
    const contests = Array.isArray(historyJson?.result) ? historyJson.result.length : 0

    return {
      platform: "Codeforces",
      username,
      profileUrl,
      score: `${contests} contests`,
      rating: user?.rating ? `${user.rating} (max ${user.maxRating || user.rating})` : "No rating",
      badges: user?.rank ? `${user.rank} rank` : "No rank",
      status: "ok",
    }
  } catch (error) {
    return {
      platform: "Codeforces",
      username,
      profileUrl,
      score: "Unavailable",
      rating: "Unavailable",
      badges: "Unavailable",
      status: "error",
      error: asErrorMessage(error),
    }
  }
}

function parseCodeChefStars(html: string): number {
  const starMatch = html.match(/<div class="rating-star">([\s\S]*?)<\/div>/)
  if (!starMatch?.[1]) {
    return 0
  }
  const stars = starMatch[1].match(/&#9733;/g)
  return stars ? stars.length : 0
}

function parseCodeChefContests(html: string): number {
  const allRatingMatch = html.match(/var all_rating = (\[[\s\S]*?\]);/)
  if (!allRatingMatch?.[1]) {
    return 0
  }

  try {
    const parsed = JSON.parse(allRatingMatch[1])
    return Array.isArray(parsed) ? parsed.length : 0
  } catch {
    return 0
  }
}

async function getCodeChefStats(): Promise<CodingProfileStat> {
  const { username, profileUrl } = PROFILE_CONFIG.codechef

  try {
    const response = await fetchWithTimeout(profileUrl)
    if (!response.ok) {
      throw new Error(`CodeChef request failed (${response.status})`)
    }

    const html = await response.text()
    const ratingMatch = html.match(/<div class="rating-number">\s*([0-9]+)\s*<\/div>/)
    const globalRankMatch = html.match(/<a href="\/ratings\/all"><strong>([0-9,]+)<\/strong><\/a>/)
    const countryRankMatch = html.match(/<a href="\/ratings\/all\?filterBy=Country%3DIndia"><strong>([0-9,]+)<\/strong>/)

    const rating = ratingMatch?.[1]
    const globalRank = globalRankMatch?.[1]
    const countryRank = countryRankMatch?.[1]
    const stars = parseCodeChefStars(html)
    const contests = parseCodeChefContests(html)

    return {
      platform: "CodeChef",
      username,
      profileUrl,
      score: `${contests} rated contests`,
      rating: rating ? `${rating} rating` : "No rating",
      badges: `${stars} stars${globalRank ? ` | G${globalRank}` : ""}${countryRank ? ` | C${countryRank}` : ""}`,
      status: "ok",
    }
  } catch (error) {
    return {
      platform: "CodeChef",
      username,
      profileUrl,
      score: "Unavailable",
      rating: "Unavailable",
      badges: "Unavailable",
      status: "error",
      error: asErrorMessage(error),
    }
  }
}

async function getHackerRankStats(): Promise<CodingProfileStat> {
  const { username, profileUrl } = PROFILE_CONFIG.hackerrank

  try {
    const [profileRes, badgesRes] = await Promise.all([
      fetchWithTimeout(`https://www.hackerrank.com/rest/contests/master/hackers/${username}/profile`),
      fetchWithTimeout(`https://www.hackerrank.com/rest/hackers/${username}/badges`),
    ])

    if (!profileRes.ok) {
      throw new Error(`HackerRank profile failed (${profileRes.status})`)
    }
    if (!badgesRes.ok) {
      throw new Error(`HackerRank badges failed (${badgesRes.status})`)
    }

    const profileJson = await profileRes.json()
    const badgesJson = await badgesRes.json()

    const level = profileJson?.model?.level
    const badges = Array.isArray(badgesJson?.models) ? badgesJson.models : []
    const totalBadges = badges.length
    const totalStars = badges.reduce((sum: number, badge: { stars?: number }) => sum + (badge.stars || 0), 0)

    const problemSolvingBadge = badges.find((badge: { badge_type?: string }) => badge.badge_type === "problem-solving")
    const solved = problemSolvingBadge?.solved

    return {
      platform: "HackerRank",
      username,
      profileUrl,
      score: solved ? `${solved} problem-solving solved` : "Score not published",
      rating: level ? `Level ${level}` : "No level",
      badges: `${totalBadges} badges | ${totalStars} stars`,
      status: "ok",
    }
  } catch (error) {
    return {
      platform: "HackerRank",
      username,
      profileUrl,
      score: "Unavailable",
      rating: "Unavailable",
      badges: "Unavailable",
      status: "error",
      error: asErrorMessage(error),
    }
  }
}

export async function getCodingProfilesData(): Promise<CodingProfilesResponse> {
  const profiles = await Promise.all([getLeetCodeStats(), getCodeChefStats(), getCodeforcesStats(), getHackerRankStats()])

  return {
    generatedAt: new Date().toISOString(),
    profiles,
  }
}
