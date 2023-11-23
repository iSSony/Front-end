// Imports
import { IModuleContent } from "@/types";
import { Col } from "react-bootstrap";

// Props Type
type IContentViewProps = {
  currentContent: IModuleContent;
  isPreviousButtonDisabled: boolean;
  handlePreviousContentClick: () => void;
  isNextButtonDisabled: boolean;
  handleNextContentClick: () => void;
};

const ContentView = ({
  currentContent,
  isPreviousButtonDisabled,
  handlePreviousContentClick,
  isNextButtonDisabled,
  handleNextContentClick,
}: IContentViewProps) => {
  return (
    <Col className="col-12 col-lg-8 mb-4 mb-lg-0">
      <iframe
        width="100%"
        height="414"
        src={currentContent?.link}
        title={currentContent?.title}
      />
      <div className="mt-3 d-flex flex-lg-row flex-column justify-content-between align-items-start">
        <h4 className=" mb-0">{currentContent?.title}</h4>
        <div className="mt-2 mt-lg-0">
          <button
            disabled={isPreviousButtonDisabled}
            onClick={handlePreviousContentClick}
            className="btn btn-success rounded-pill me-2 moduleContentControlButtons"
          >
            Previous
          </button>
          <button
            disabled={isNextButtonDisabled}
            onClick={handleNextContentClick}
            className="btn btn-success rounded-pill moduleContentControlButtons"
          >
            Next
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ContentView;
