import "./Features.css";
import { Card } from "./Card";

import {
  AiOutlineStar,
  AiOutlineSetting,
  AiOutlineCheckCircle,
  AiOutlineBarChart,
  AiOutlineThunderbolt,
  AiOutlineRocket,
} from "react-icons/ai";

export const Features = () => {
  return (
    <section className="Features">
      <h1 className="FeaturesHeading">
        A gifting platform to customize and automate gift campaigns for every
        initiative.
      </h1>
      <div className="FeaturesRow">
        <Card icon={<AiOutlineStar />}>Easy set up, like it should be.</Card>
        <Card icon={<AiOutlineSetting />}>
          Automate multiple campaign types.
        </Card>
        <Card icon={<AiOutlineCheckCircle />}>
          Send bulk gifts with a button click.
        </Card>
      </div>
      <div className="FeaturesRow">
        <Card icon={<AiOutlineBarChart />}>
          Get employee insights and metrics.
        </Card>
        <Card icon={<AiOutlineThunderbolt />}>
          Long-term, cost-effective gifting.
        </Card>
        <Card icon={<AiOutlineRocket />}>Global Shipping.</Card>
      </div>
    </section>
  );
};
