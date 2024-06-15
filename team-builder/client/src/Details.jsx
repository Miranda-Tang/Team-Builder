const Details = ({ member }) => {
  return (
    <>
      <img id="avatar" src={member.image} alt={member.name} />
      <p>
        {member.description.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
      <p>Age: {member.age}</p>
    </>
  );
};

export default Details;
