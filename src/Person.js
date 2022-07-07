export default function Person({first_name, last_name, skills, experience, education, projects, rating}) {
  return (
    <div style={{width: "300px", overflow: "hidden", backgroundColor: "#0f2557", display: "flex", flexDirection: "row", margin: "8px", flex: 1, alignItems: "center", justifyContent: "center", border: "1px black solid",  padding: "0px", borderRadius: "15px 50px 30px"}}>
      <div style={{flex: 4, flexDirection: "row", textAlign: "left", justifyContent: "left", padding: "10spx"}}>
        <p style={{fontSize: "30px", color: "white"}}>{rating}%</p>
      </div>
      <div style={{flex: 10, backgroundColor: "#3773c2", justifyContent:"left", textAlign:"left"}}>
        <p style={{fontSize: "15px"}}>{first_name} {last_name}</p>
        <p style={{fontSize: "15px"}}>{education} student</p>
        <p style={{fontSize: "15px"}}>skills: {skills}</p>
      </div>
    </div>
  )
}
