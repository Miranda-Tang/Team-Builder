// Citation: Use Material-UI search component as a reference
// https://mui.com/material-ui/react-app-bar/#app-bar-with-search-field
import React, {useState} from "react";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "./Modal.jsx";
import Details from "./Details.jsx";
import {updateMemberAsync} from "./membersSlice.js";
import {useDispatch} from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBar = ({ membersList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchedMember, setSearchedMember] = useState(null);

  const dispatch = useDispatch();

  const searchMember = async (name) => {
    try {
      const response = await fetch(`${process.env.HOST}/api/members/${name}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const member = await response.json();
      setSearchedMember(member);
      setShowModal(true);
      setSearchTerm("");
    } catch (error) {
      console.error(error.message);
    }
  };

  const filteredMembers = membersList
    .filter(
      (member, index, self) =>
        index ===
        self.findIndex(
          (m) => m.name.toLowerCase() === member.name.toLowerCase(),
        ),
    )
    .filter((member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Name"
        inputProps={{ "aria-label": "search" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      />
      {isOpen && searchTerm && (
        <>
          <div className="overlay"></div>
          <div className="autocomplete-dropdown-container">
            {filteredMembers.map((member, index) => (
              <button
                key={index}
                className="suggestion-button"
                onMouseDown={() => searchMember(member.name)}
              >
                {member.name}
              </button>
            ))}
          </div>
        </>
      )}
      {showModal && searchedMember && (
        <Modal>
          <Details member={searchedMember} />
          <div id="button-container">
            <button
              onClick={() => {
                dispatch(
                  updateMemberAsync({
                    id: searchedMember._id,
                    updates: { isSelected: true },
                  }),
                );
                setShowModal(false);
              }}
              disabled={searchedMember.isSelected || searchedMember.team}
            >
              Select
            </button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </Modal>
      )}
    </Search>
  );
};

export default SearchBar;
