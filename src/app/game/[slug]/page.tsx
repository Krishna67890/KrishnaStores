import { games } from "@/lib/data";
import { notFound } from "next/navigation";
import GameDetailClient from "./GameDetailClient";

export async function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);
  if (!game) return { title: "Game Not Found" };

  return {
    title: `${game.title} | Krishna Stores`,
    description: game.description.substring(0, 160),
  };
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.slug === params.slug);

  if (!game) {
    notFound();
  }

  return <GameDetailClient game={game} />;
}
