import songsList from "./songsList";

export default function selectSong(date: Date): string {
  return songsList[date.getDate() % songsList.length];
}
