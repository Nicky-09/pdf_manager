import { Link } from "react-router-dom";
import { Button } from "antd";
function LandingPageButton() {
  return (
    <Link to="/signup" class="nav-link">
      <Button type="primary">
        <Link to="/signup">Join Us!</Link>
      </Button>
    </Link>
  );
}
function LandingFrameMessage() {
  const style = {
    margin: "auto",
    padding: "32% 90% 10% 6%",
    color: "white",
  };
  return (
    <div style={style}>
      <br />
      <br />
      <LandingPageButton />
    </div>
  );
}
function LandingFrame() {
  const style = {
    backgroundImage: `url("bg-img.png")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "absolute",
    height: "100%",
    width: "100%",
  };
  return (
    <div style={style}>
      <LandingFrameMessage />
    </div>
  );
}
function HomePage() {
  return (
    <div>
      <LandingFrame />
    </div>
  );
}
export default HomePage;
