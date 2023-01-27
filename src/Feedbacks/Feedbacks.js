import "./Feedbacks.css";
import { AiOutlineUser } from "react-icons/ai";

const Feedback = ({ text, userName, role }) => {
  return (
    <div className="Feedback">
      <div className="FeedbackText">{text}</div>
      <div className="UserProfile">
        <div className="UserImage">
          <AiOutlineUser />
        </div>
        <div className="UserName">
          {userName}
          <br />
          {role}
        </div>
      </div>
    </div>
  );
};

export const Feedbacks = () => {
  return (
    <section className="Feedbacks">
      <div className="FeedbacksHeading">
        Companies creating ripples across their organizations:
      </div>
      <div className="FeedbackContainer">
        <Feedback
          text="“We care deeply about our employees at TaskRabbit and Snappy really helps us live our core values by allowing us to recognize milestones, life events and stellar performance!”"
          userName="Saralynn Malott"
          role="Head of People, TaskRabbit"
        />
        <Feedback
          text="“Partnering with Snappy Gifts allowed us to to select gifts that have personal and organizational meaning, which is always the most powerful way to recognize others.”"
          userName="Matt Hoffman"
          role="VP of People, Digital Ocean"
        />
      </div>
    </section>
  );
};
