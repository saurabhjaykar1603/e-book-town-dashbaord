import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>E Book Town</title>
        <meta name="description" content="E Book Town" />
      </Helmet>
      <div className="flex justify-center gap-5 flex-col w-96 mx-auto items-center h-screen">
        <h1 className="text-[25px] text-center">Welcome to E Book Town </h1>{" "}
        <Link to={"/auth/login"}>
          <Button variant={"outline"} className="w-[300px]">
            Get Started
          </Button>
        </Link>
      </div>
    </>
  );
}

export default App;
