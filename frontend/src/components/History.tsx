import HistList from "./HistList";
import Nav from "./Nav";

function History() {
  return (
    <div className="h-screen w-screen">
      <Nav />
      <HistList
        hist={JSON.parse(localStorage.getItem("HISTORY_DATA") || "[]")}
      />
    </div>
  );
}

export default History;
