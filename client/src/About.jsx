const About = () => {
  return (
    <div id="about_container">
      <div id="introduction_container">
        <div id="introduction_text">
          <p>Hi, I&apos;m Miranda! </p>
          <p>
            A software development intern with a prior background in language
            teaching,
            <br /> aiming for a career in technology.
          </p>
          <p>Contacts:</p>
          <div id="contacts">
            <a
              className="fa fa-linkedin"
              href="https://www.linkedin.com/in/miranda-tang/"
              aria-label="LinkedIn"
            />
            <a
              className="fa fa-github"
              href="https://github.com/Miranda-Tang"
              aria-label="GitHub"
            />
            <a
              className="fa fa-envelope"
              href="mailto:mirandatang0708@gmail.com"
              aria-label="Email"
            />
          </div>
        </div>
        <div className="member-image">
          <img
            alt="Miranda"
            src="https://avatars.githubusercontent.com/u/81618041?v=4"
          />
        </div>
      </div>

      <div id="course_container">
        <h3>About CPSC 455</h3>
        <p>
          Hands-on project, mentored by industry experts,
          <br />
          integrating skills relevant to early career in the computing industry:
          <br />
          technical skills, communication, teamwork, networking and portfolio
          building.
        </p>
        <p>Prerequisite: One of CPSC 310, CPEN 321</p>
        <p>Corequisite: N/A</p>
        <br />
        <a
          href="https://www.students.cs.ubc.ca/~cs-455/2024_S"
          id="course_link"
        >
          <i className="fa fa-external-link"></i> Link to the course website
        </a>
      </div>
    </div>
  );
};

export default About;
