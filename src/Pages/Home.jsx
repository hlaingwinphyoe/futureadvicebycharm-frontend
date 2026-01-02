import styles from "@/styles";
import About from "./Home/About";
import Zodiac from "./Home/Zodiac";
import Service from "./Home/Service";
import HomeBlog from "./Home/HomeBlog";
import Index from "./Home/Index";

export default function HomeNew() {
  return (
    <div className={`${styles.flexCenter}`}>
      <div className="w-full">
        <Index />
        <About />
        <Service />
        <Zodiac />
        <HomeBlog />
      </div>
    </div>
  );
}
