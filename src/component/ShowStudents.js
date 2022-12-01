import React, { useState, useEffect } from "react";
import classes from "./ShowStudents.module.css";
const ShowStudents = (props) => {
  const [students, setStudents] = useState([]);
  const [pickStudents, setPickStudents] = useState([]);

  useEffect(() => {
    setStudents([...props.students]);
  }, [props.students]);

  useEffect(() => {
    setPickStudents([...props.pickStudents]);
  }, [props.pickStudents]);

  return (
    <div className={classes["students-area"]}>
      <div className={classes["students-div"]}>
        {students.map((stu) => (
          <li
            key={"li" + stu.num}
            id={stu.num}
            className={classes["student-li"]}
          >
            <span className={classes["studentNum-span"]}>{stu.num}</span>
            <span>{stu.name}</span>
          </li>
        ))}
      </div>
      <div className={classes["pickStudents-div"]}>
        {pickStudents.map((stu) => (
          <li
            key={"li" + stu.num}
            id={stu.num}
            className={classes["student-li"]}
          >
            <span className={classes["studentNum-span"]}>{stu.num}</span>
            <span>{stu.name}</span>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ShowStudents;
