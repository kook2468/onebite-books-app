import SearchBar from "./searchbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  );
}
