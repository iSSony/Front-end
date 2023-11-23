// Imports
import { InputGroup, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) => {
  return (
    <InputGroup
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchTerm(e.target.value)
      }
    >
      <Form.Control
        value={searchTerm}
        placeholder="Search courses"
        aria-label="Search courses"
        aria-describedby="basic-addon1"
      />
      {searchTerm.length > 0 && (
        <InputGroup.Text
          id="basic-addon1"
          onClick={() => setSearchTerm("")}
          style={{ cursor: "pointer" }}
        >
          Reset
          <FontAwesomeIcon icon={faRotateLeft} className="ms-2" />
        </InputGroup.Text>
      )}
    </InputGroup>
  );
};

export default SearchBar;
