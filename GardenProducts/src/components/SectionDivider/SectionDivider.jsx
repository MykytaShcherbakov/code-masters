import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import "./SectionDivider.scss";

const SectionDivider = ({ sectionTitle, linkToPage, pageTitle }) => {
 
  return (
    <div className="section__header">
      <h3 className={"section__title"}>{sectionTitle}</h3>
      <div className="section__divider">
        <div className="section__line"></div>
        <Link to={linkToPage}>
          <Button btnColor={"neutral"} btnSize={"S"} btnText={pageTitle} />
        </Link>
      </div>
    </div>
  );
};

export default SectionDivider;