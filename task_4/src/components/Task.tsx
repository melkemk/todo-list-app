import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";


interface TaskProps {
  val: string;
  updateItem: (oldVal: string, newVal: string) => void;
  deleteItem: (val: string) => void;
}

const Task = ({ val, updateItem, deleteItem }:TaskProps)  =>
   {  const [x, setX] = useState(val);
    const [initial ,setinitial] = useState(val);
    function setx(){
      setinitial(x)
      updateItem(val, x)
    }
    return (
      <div className="add">
        <input
          type="text"
          value={x}
          onChange={(e) => {setX(e.target.value)}

        }
        />
       
        <button
          id={val}
          onClick={() => setx()}
        >
          <FontAwesomeIcon icon={(initial===x?faEdit:faCheck  )as IconProp } style={{ color: 'blue' }} />
        </button>
        <button
          id={val}
          onClick={() => deleteItem(val)}
        >
          <FontAwesomeIcon icon={faTrash as IconProp} style={{ color: 'red' }} />
        </button>
      </div>
    );
  }

  export default Task;