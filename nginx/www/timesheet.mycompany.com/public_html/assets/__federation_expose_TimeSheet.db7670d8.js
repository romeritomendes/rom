import {importShared} from './__federation_fn_import.js'
const {r:react} = await importShared('react')

const {default:hooks} = await importShared('moment')

const {default:axios} = await importShared('axios')

const {default:He} = await importShared('styled-components')


const BASE_URL = "http://localhost:4300/";

const getTaskWorkDays = async ({ year, month, weekNumber }) => new Promise((resolve, reject) => {
  const uri = weekNumber ? `${BASE_URL}timesheet/week/${year}/${weekNumber}` : `${BASE_URL}timesheet/month/${year}/${month}`;
  axios.get(uri).then((res) => {
    const projectsWorkDays = res.data.rows.map(
      (row) => ({
        id: row._id,
        description: row.description,
        projectId: row.project?._id,
        name: row.project?.name,
        rateValueHour: row.project?.rateValueHour,
        color: row.project?.color ? `#${row.project?.color}` : `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        workday: hooks(row.workday),
        workhours: row.hours,
        preview: row.preview
      })
    );
    return resolve(projectsWorkDays);
  }).catch((err) => {
    console.log(err);
    return reject([]);
  });
});

const addTask = async ({ projectId, workdays }) => {
  let uri = `${BASE_URL}timesheet`;
  try {
    for (const work of workdays) {
      for (const row of work.hours) {
        if (row.id) {
          uri = `${uri}/${row.id}`;
          await axios.put(
            uri,
            {
              projectId,
              description: row.description,
              workday: row.date,
              hours: row.workhours,
              preview: row.preview
            }
          );
        } else {
          await axios.post(
            uri,
            {
              projectId,
              description: row.description,
              workday: row.date,
              hours: row.workhours,
              preview: row.preview
            }
          );
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
const addTaskWorkDays = ({ projectId, workdays }) => new Promise((resolve, reject) => {
  addTask({ projectId, workdays }).catch((err) => console.log(err)).finally(() => resolve());
});
const handleDel = (id) => new Promise((resolve, reject) => {
  const uri = `${BASE_URL}timesheet/${id}`;
  axios.delete(uri).then(() => {
    alert("Apontamento eliminado!");
  }).catch((err) => {
    console.log(err);
    alert("Erro ao eliminar apontamneto!");
  }).finally(() => resolve());
});

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=react.exports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

(function (module) {

	{
	  module.exports = reactJsxRuntime_production_min;
	}
} (jsxRuntime));

const Fragment = jsxRuntime.exports.Fragment;
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;

const NEW_TASK = {
  id: void 0,
  description: "",
  projectId: "",
  name: "",
  color: "",
  rateValueHour: 0,
  workday: hooks(),
  workhours: 8,
  preview: false
};
const Context = react.exports.createContext({
  year: 0,
  type: "TM",
  month: 0,
  setType: () => {
  },
  weekNumber: 0,
  newTask: () => {
  },
  selectedTask: NEW_TASK,
  setSelectedTaskId: () => {
  },
  tasksWorkDays: [],
  back: () => {
  },
  forward: () => {
  },
  addTaskWorkDays: () => {
  },
  dialogShow: false,
  openDialog: () => {
  },
  closeDialog: () => {
  },
  onDelTask: () => {
  }
});
const DEFAULT_YEAR = Number.parseInt(hooks().format("YYYY"));
const DEFAULT_MONTH = Number.parseInt(hooks().format("MM"));
const DEFAULT_WEEK = hooks().isoWeek();
const Provider = ({
  children
}) => {
  const [year, setYear] = react.exports.useState(DEFAULT_YEAR);
  const [month, setMonth] = react.exports.useState(DEFAULT_MONTH);
  const [weekNumber, setWeek] = react.exports.useState(DEFAULT_WEEK);
  const [tasks, setTasks] = react.exports.useState([]);
  const [selectedTaskId, setSelectedTaskId] = react.exports.useState(void 0);
  const [dialogShow, setDialogShow] = react.exports.useState(false);
  const [type, setType] = react.exports.useState("TM");
  react.exports.useEffect(() => {
    if (type === "TS")
      return;
    getTaskWorkDays({
      year,
      month
    }).then((resTasks) => setTasks(resTasks));
  }, [year, month, type]);
  react.exports.useEffect(() => {
    if (type !== "TS")
      return;
    const mday = hooks().day("Sunday").week(weekNumber);
    const newMonth = parseInt(mday.format("MM"));
    getTaskWorkDays({
      year,
      weekNumber
    }).then((resTasks) => setTasks(resTasks));
    if (newMonth !== month)
      setMonth(newMonth);
  }, [year, weekNumber, type]);
  const LAST_WEEK_YEAR = hooks(`${("0000" + year).slice(-4)}-12-31`).isoWeek();
  const handleBackMonth = () => {
    setMonth((month2) => month2 === 1 ? 12 : month2 - 1);
  };
  const handleForwardMonth = () => {
    setMonth((month2) => month2 === 12 ? 1 : month2 + 1);
  };
  const handleBackWeek = () => {
    setWeek((week) => week === 1 ? LAST_WEEK_YEAR : week - 1);
  };
  const handleForwardWeek = () => {
    setWeek((week) => week === LAST_WEEK_YEAR ? 1 : week + 1);
  };
  const handleSelectedTaskId = (id) => {
    setSelectedTaskId(id);
    if (id)
      setDialogShow(true);
  };
  let taskEdit = tasks.filter((task) => task.id === selectedTaskId)[0];
  const handleNewTask = ({
    workday,
    projectId
  }) => {
    setSelectedTaskId(void 0);
    NEW_TASK.projectId = projectId ? projectId : "";
    NEW_TASK.workday = hooks(workday);
    setDialogShow(true);
  };
  return /* @__PURE__ */ jsx(Context.Provider, {
    value: {
      year,
      type,
      setType,
      month,
      weekNumber,
      newTask: handleNewTask,
      selectedTask: selectedTaskId ? taskEdit : NEW_TASK,
      setSelectedTaskId: handleSelectedTaskId,
      tasksWorkDays: tasks,
      back: () => type === "TS" ? handleBackWeek() : handleBackMonth(),
      forward: () => type === "TS" ? handleForwardWeek() : handleForwardMonth(),
      addTaskWorkDays: (props) => {
        addTaskWorkDays(props).finally(() => {
          getTaskWorkDays({
            year,
            month,
            weekNumber: type === "TS" ? weekNumber : void 0
          }).then((resTasks) => setTasks(resTasks));
          setDialogShow(false);
        });
      },
      dialogShow,
      openDialog: () => setDialogShow(true),
      closeDialog: () => setDialogShow(false),
      onDelTask: (id) => {
        handleDel(id).then(() => {
          getTaskWorkDays({
            year,
            month,
            weekNumber: type === "TS" ? weekNumber : void 0
          }).then((resTasks) => setTasks(resTasks));
          setDialogShow(false);
        });
      }
    },
    children
  });
};
const useGlobalContextState = () => {
  return react.exports.useContext(Context);
};

const useProjects = (props) => {
  const [projects, setProjects] = react.exports.useState([]);
  const fetchProjects = async () => {
    const uri = `${BASE_URL}project`;
    const resp = await axios.get(uri);
    if (!resp || !resp.data)
      return;
    const respProjects = resp.data.rows.map(
      (row) => ({
        projectId: row._id,
        projectName: row.name,
        color: row.color,
        rateValueHour: row.rateValueHour,
        payerId: row.payerId,
        payerName: row.payer.name,
        receptorId: row.receptorId,
        receptorName: row.receptor.name
      })
    );
    setProjects(respProjects);
  };
  react.exports.useEffect(() => {
    fetchProjects();
  }, []);
  const projectOptions = projects?.map(
    (project) => ({
      label: project.projectName,
      value: project.projectId
    })
  );
  return { projects, projectOptions };
};

const CheckBox = (props) => {
  return /* @__PURE__ */ jsx(Container$d, {
    ...props
  });
};
const Container$d = He.input`
    border: .05rem solid #777;
    border-radius: 6px;
    padding: 0 1rem;
    
    min-height: 2.563rem;
    font-size: 1rem;

    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;

    outline: none;

    vertical-align: middle;

    &:focus, &:hover {
        border-color: hsl(200, 100%, 50%);
    }
`;

const Input = (props) => {
  return /* @__PURE__ */ jsx(Container$c, {
    ...props
  });
};
const Container$c = He.input`
    border: .05rem solid #777;
    border-radius: 6px;
    padding: 0 1rem;
    
    min-height: 2.563rem;
    font-size: 1rem;

    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;

    outline: none;

    vertical-align: middle;

    &:focus, &:hover {
        border-color: hsl(200, 100%, 50%);
    }
`;

const RadioButton = (props) => {
  return /* @__PURE__ */ jsx(Container$b, {
    ...props
  });
};
const Container$b = He.input`
    border: .05rem solid #777;
    border-radius: 6px;
    padding: 0 1rem;
    
    min-height: 2.563rem;
    font-size: 1rem;

    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;

    outline: none;

    vertical-align: middle;

    &:focus, &:hover {
        border-color: hsl(200, 100%, 50%);
    }
`;

const Select = ({
  options,
  value,
  onChange
}) => {
  const [show, setShow] = react.exports.useState(false);
  const selectedOption = options.find((o) => o.value === value);
  const handleClick = (itemValue) => {
    onChange(itemValue);
    setShow(false);
  };
  return /* @__PURE__ */ jsxs(Container$a, {
    tabIndex: 0,
    children: [/* @__PURE__ */ jsx(Value, {
      onClick: () => setShow((open) => !open),
      children: selectedOption?.label
    }), /* @__PURE__ */ jsx(ClearBtn, {
      onClick: () => handleClick(""),
      children: "\xD7"
    }), /* @__PURE__ */ jsx(Divider, {}), /* @__PURE__ */ jsx(Caret, {
      onClick: () => setShow((open) => !open)
    }), /* @__PURE__ */ jsx(List, {
      show,
      children: options.map((item) => /* @__PURE__ */ jsx(ListItem, {
        onClick: () => handleClick(item.value),
        children: item.label
      }, item.value))
    })]
  });
};
const Container$a = He.article`
    position: relative;

    display: flex;
    align-items: center;
    gap: .5rem;

    border: .05rem solid #777;
    border-radius: .5rem;
    padding: .5rem;

    min-height: 1.5rem;
    outline: none;

    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);

    &:focus, &:hover {
        border-color: hsl(200, 100%, 50%);
    }
`;
const Value = He.span`
    flex-grow: 1;

    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
`;
const ClearBtn = He.button`
    border: none;
    padding: 0;
    background: none;
    color: #777;

    outline: none;

    font-size: 1.25rem;

    cursor: pointer;

    &:focus, &:hover {
        color: #333;
    }
`;
const Divider = He.div`
    align-self: stretch;

    width: .05rem;

    background-color: #777;
`;
const Caret = He.div`
    border: .25em solid transparent;
    translate: 0 25%;
    border-top-color: #777;

    cursor: pointer;
`;
const List = He.ul`
    position: absolute;
    display: ${(p) => p.show ? "block" : "none"};

    margin: 0;
    padding: 0;

    border: .05rem solid #777;
    border-radius: .5rem;

    list-style: none;

    left: 0;
    top: calc(100% + .25rem);

    width:  100%;
    max-height: 15rem;
    overflow-y: auto;

    z-index: 1;
    background-color: #FFF;
`;
const ListItem = He.li`
    padding: .25rem .5rem;

    cursor: pointer;

    &:focus, &:hover {
        color: #FFF;
        background-color: hsl(200, 100%, 50%);
    }
`;

const Field = ({
  type,
  options,
  name,
  label,
  width,
  value,
  onChange
}) => {
  const formatNumber = (value2) => {
    const newValue = value2 === "" ? "0" : value2.replace(/\D/g, "");
    return newValue;
  };
  const formatHour = (value2) => {
    const textValue = ("000" + formatNumber(value2)).slice(-3);
    const newValue = parseFloat(textValue) / 10;
    return newValue.toString();
  };
  const formatAmount = (value2) => {
    const parseValue = Number.parseFloat(formatNumber(value2));
    const newValue = new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(parseValue);
    return newValue;
  };
  const formatValue = (value2) => {
    switch (type) {
      case "number":
        return formatNumber(value2);
      case "amount":
        return formatAmount(value2);
      case "hour":
        return formatHour(value2);
      default:
        return value2;
    }
  };
  const isNumber = () => {
    return ["number", "amount", "hour"].find((value2) => value2 === type);
  };
  const handleChange = (value2) => {
    const newValue = formatValue(value2);
    onChange(newValue);
  };
  if (type === "select" && options) {
    return /* @__PURE__ */ jsxs(Container$9, {
      width,
      children: [/* @__PURE__ */ jsx("label", {
        htmlFor: name,
        children: label
      }), /* @__PURE__ */ jsx(Select, {
        options,
        value,
        onChange
      })]
    });
  }
  if (type === "radio") {
    return /* @__PURE__ */ jsxs(Container$9, {
      width,
      children: [/* @__PURE__ */ jsx("label", {
        htmlFor: name,
        children: label
      }), /* @__PURE__ */ jsx(RadioButton, {
        type: "radio",
        name,
        onClick: (e) => onChange(e.currentTarget.checked ? "X" : "")
      })]
    });
  }
  if (type === "checkbox") {
    return /* @__PURE__ */ jsxs(Container$9, {
      width,
      children: [label && /* @__PURE__ */ jsx("label", {
        htmlFor: name,
        children: label
      }), /* @__PURE__ */ jsx(CheckBox, {
        type: "checkbox",
        name,
        checked: value === "X",
        onChange: (e) => onChange(e.target.checked ? "X" : "")
      })]
    });
  }
  return /* @__PURE__ */ jsxs(Container$9, {
    width,
    children: [/* @__PURE__ */ jsx("label", {
      htmlFor: name,
      children: label
    }), /* @__PURE__ */ jsx(Input, {
      type: type === "date" ? type : "text",
      name,
      value: formatValue(value),
      onChange: (e) => handleChange(e.target.value),
      style: {
        textAlign: isNumber() ? "right" : "left"
      }
    })]
  });
};
const Container$9 = He.div`
    display: flex;
    flex-direction: column;

    gap: 0.4rem;

    padding-bottom: 1rem;
    width: ${(p) => p.width ? `${p.width}rem` : `100%`};

    &>label {
        padding: 0 8px;
        
        font-size: 1rem;
        font-weight: bold;
    }
`;

const FieldRange = ({
  type,
  name,
  label,
  width,
  lowValue,
  highValue,
  onChange,
  disabled
}) => {
  return /* @__PURE__ */ jsxs(Container$8, {
    children: [/* @__PURE__ */ jsx("label", {
      htmlFor: name,
      children: label
    }), /* @__PURE__ */ jsxs(InputLine$1, {
      children: [/* @__PURE__ */ jsx(Input, {
        type: type === "date" ? type : "text",
        name: `${name}Low`,
        value: lowValue,
        onChange: (e) => onChange({
          kind: "LOW",
          value: e.target.value
        }),
        style: {
          textAlign: type === "number" ? "right" : "left",
          width: `${width}rem`
        },
        disabled
      }), /* @__PURE__ */ jsx(Input, {
        type: type ? type : "text",
        name: `${name}High`,
        value: highValue,
        onChange: (e) => onChange({
          kind: "HIGH",
          value: e.target.value
        }),
        style: {
          textAlign: type === "number" ? "right" : "left",
          width: `${width}rem`
        },
        disabled
      })]
    })]
  });
};
const Container$8 = He.div`
    display: flex;
    flex-direction: column;

    gap: 0.4rem;

    padding-bottom: 1rem;
    width: ${(p) => p.width ? `${p.width}rem` : `100%`};

    &>label {
        padding: 0 8px;
        
        font-size: 1rem;
        font-weight: bold;
    }
`;
const InputLine$1 = He.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`;

const Wrapper$1 = ({
  task,
  selectedDay,
  closeDialog,
  onSave,
  onDel
}) => {
  const [projectId, setProjectId] = react.exports.useState(task.projectId);
  const [description, setDescription] = react.exports.useState(task.description);
  const [hours, setHours] = react.exports.useState(task.workhours);
  const [dateFrom, setDateFrom] = react.exports.useState(selectedDay);
  const [dateTo, setDateTo] = react.exports.useState(selectedDay);
  const [preview, setPreview] = react.exports.useState(task.preview);
  const {
    projectOptions
  } = useProjects();
  const handleSave = () => {
    const newHours = [];
    const days = dateTo.endOf("D").diff(dateFrom.endOf("D"), "d");
    const baseDate = hooks(dateFrom);
    for (let idx = 0; idx <= days; idx++) {
      if (baseDate.day() !== 0 && baseDate.day() !== 6) {
        newHours.push({
          id: task.id,
          workday: parseInt(baseDate.format("DD")),
          date: baseDate.toDate(),
          description,
          workhours: hours,
          preview
        });
      }
      baseDate.add(1, "d");
    }
    onSave({
      projectId,
      newHours
    });
  };
  return /* @__PURE__ */ jsxs(Container$7, {
    children: [/* @__PURE__ */ jsx(TitleLine$1, {
      children: "Adicionar Atividade"
    }), /* @__PURE__ */ jsxs(InputLine, {
      children: [/* @__PURE__ */ jsx(Field, {
        type: "select",
        options: projectOptions,
        name: "projectId",
        label: "Projeto",
        width: 20,
        value: projectId,
        onChange: (value) => setProjectId(value)
      }), /* @__PURE__ */ jsx(Field, {
        type: "hour",
        name: "hours",
        label: "Tempo (H)",
        width: 7,
        value: hours.toFixed(1),
        onChange: (value) => {
          console.log(value);
          setHours(parseFloat(value));
        }
      })]
    }), /* @__PURE__ */ jsx(Field, {
      type: "text",
      name: "description",
      label: "Descri\xE7\xE3o",
      value: description,
      onChange: (value) => setDescription(value)
    }), /* @__PURE__ */ jsx(FieldRange, {
      type: "date",
      name: "date",
      label: "Data",
      width: 14,
      lowValue: dateFrom.format("YYYY-MM-DD"),
      highValue: dateTo.format("YYYY-MM-DD"),
      disabled: task.id ? true : false,
      onChange: ({
        kind,
        value
      }) => kind === "LOW" ? setDateFrom(hooks(value)) : setDateTo(hooks(value))
    }), /* @__PURE__ */ jsx(Field, {
      type: "checkbox",
      name: "preview",
      label: "Preview",
      value: preview ? "X" : "",
      onChange: (value) => {
        setPreview(value === "X");
      }
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx(Button, {
        onClick: closeDialog,
        children: "Cancelar"
      }), task.id && /* @__PURE__ */ jsx(Button, {
        onClick: () => task.id && onDel(task.id),
        children: "Apagar"
      }), /* @__PURE__ */ jsx(Button, {
        onClick: handleSave,
        children: "Salvar"
      })]
    })]
  });
};
const Container$7 = He.div`
    position: absolute;
    top: 300px;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    gap: 0.5rem;

    padding: 0.5rem;

    border: 1px solid black;

    background-color: #FFFFFF;
`;
const TitleLine$1 = He.span`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 3.125rem;

    font-size: 2rem;
    font-weight: bold;
`;
const InputLine = He.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
`;
const Button = He.button`
    border: 0.1px solid #000000;
    border-radius: 4px;

    width:  5rem;
    min-height: 2.563rem;

    background: #FCFCFC;

    box-sizing: border-box;

    font-weight: bold;

    cursor: pointer;

    &:focus, &:hover {
        border-color: hsl(200, 100%, 50%);
        color: hsl(200, 100%, 50%);
    }
`;

const ProjectForm = () => {
  const {
    month,
    addTaskWorkDays,
    selectedTask,
    closeDialog,
    dialogShow,
    onDelTask
  } = useGlobalContextState();
  if (!dialogShow)
    return /* @__PURE__ */ jsx(Fragment, {});
  const handleSave = ({
    projectId,
    newHours
  }) => {
    addTaskWorkDays({
      projectId,
      workdays: [{
        month,
        hours: newHours
      }]
    });
  };
  return /* @__PURE__ */ jsx(Container$6, {
    children: /* @__PURE__ */ jsx(Wrapper$1, {
      selectedDay: selectedTask.workday,
      task: selectedTask,
      closeDialog,
      onSave: handleSave,
      onDel: onDelTask
    })
  });
};
const Container$6 = He.article`
    position: fixed;

    display: flex;
    justify-content: center;

    top: 0;
    /* left: 300px; */
    left: 0;
    width: 100ch;
    height: 100vh;

    background-color: rgb(255 255 255 / 50%);

    z-index: 3;
`;

const Days = ({
  dayText,
  size,
  disable,
  holiday,
  tasks,
  onDayClick,
  onTaskClick
}) => {
  const handleClick = (e, onClick) => {
    e.preventDefault();
    onClick();
  };
  return /* @__PURE__ */ jsxs(Container$5, {
    size,
    disable,
    holiday,
    children: [/* @__PURE__ */ jsx(Text, {
      onClick: (e) => handleClick(e, onDayClick),
      children: dayText
    }), tasks && tasks.map((task) => /* @__PURE__ */ jsx(ProjectLine, {
      color: task.color,
      onClick: () => task.id && onTaskClick(task.id),
      children: /* @__PURE__ */ jsx("p", {
        children: task.name.split(" ")[0].substring(0, 12)
      })
    }, task.id))]
  });
};
const Container$5 = He.div`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: 1px dashed black;

    width: ${(p) => p.size}rem;
    height: ${(p) => p.size}rem;

    background-color: ${(p) => {
  if (p.disable)
    return "grey";
  if (p.holiday)
    return "rgba(134, 134, 134, 0.1)";
  return "white";
}};
    opacity: ${(p) => p.disable || p.holiday ? 30 : 100}%;

    font-size: 1.5rem;
`;
const ProjectLine = He.div`
    width: 100%;
    min-height: 1rem;

    border: 1px solid black;
    /* border-top: 1px solid black;
    border-bottom: 1px solid black; */

    background-color: ${(p) => p.color};
    opacity: 30%;

    cursor: pointer;

    box-shadow: 4px 6px 6px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 4px 6px 6px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 4px 6px 6px 0px rgba(0,0,0,0.75);

    &:hover {
        opacity: 100%;
        
        min-height: 1.5rem;

        font-weight: bold;

        z-index: 3;
    }

    &>p {
        margin: 0;
        color: ${(p) => p.color};
        mix-blend-mode: difference;

        font-size: 0.9rem;
        text-align: center;
    }
`;
const Text = He.b`
    position: absolute;

    margin: auto;

    cursor: pointer;

    z-index: 3;
`;

const Week = ({
  weekNumber,
  month,
  tasks
}) => {
  const {
    newTask,
    setSelectedTaskId
  } = useGlobalContextState();
  const mday = hooks().day("Sunday").week(weekNumber);
  const days = [];
  for (let idx = 1; idx <= 7; idx++) {
    const lday = parseInt(mday.format("DD"));
    const lmonth = parseInt(mday.format("MM"));
    days.push({
      id: `${weekNumber}_${mday.format("DD")}`,
      mday: hooks(mday),
      dayText: mday.format("DD"),
      day: lday,
      month: lmonth,
      week: weekNumber,
      weekDay: mday.weekday(),
      tasks: lmonth === month ? tasks.filter((task) => parseInt(task.workday.format("DD")) === lday) : []
    });
    mday.add(1, "d");
  }
  return /* @__PURE__ */ jsx(Container$4, {
    children: days && days.map((day) => /* @__PURE__ */ jsx(Days, {
      dayText: day.dayText,
      size: 6,
      disable: day.month !== month,
      holiday: day.weekDay === 0 || day.weekDay === 6,
      tasks: day.tasks,
      onDayClick: () => newTask({
        workday: day.mday
      }),
      onTaskClick: setSelectedTaskId
    }, day.id))
  });
};
const Container$4 = He.div`
    display: flex;
`;

const getWeeksOfMonth = ({ year, month }) => {
  const baseDate = hooks(`${year}-${month}-01`);
  const firstWeek = baseDate.week();
  const weeknumbers = [];
  for (let weeknumber = firstWeek; weeknumber <= firstWeek + 5; weeknumber++) {
    weeknumbers.push(weeknumber);
  }
  return weeknumbers;
};

const Calendar = ({}) => {
  const {
    year,
    month,
    tasksWorkDays
  } = useGlobalContextState();
  const weeknumbers = getWeeksOfMonth({
    year,
    month
  });
  return /* @__PURE__ */ jsxs(Container$3, {
    children: [/* @__PURE__ */ jsxs(TitleLine, {
      children: [/* @__PURE__ */ jsx(WeekTitle, {
        children: "Domingo"
      }), /* @__PURE__ */ jsx(WeekTitle, {
        children: "Segunda"
      }), /* @__PURE__ */ jsx(WeekTitle, {
        children: "Ter\xE7a"
      }), /* @__PURE__ */ jsx(WeekTitle, {
        children: "Quarta"
      }), /* @__PURE__ */ jsx(WeekTitle, {
        children: "Quinta"
      }), /* @__PURE__ */ jsx(WeekTitle, {
        children: "Sexta"
      }), /* @__PURE__ */ jsx(WeekTitle, {
        children: "Sabado"
      })]
    }), /* @__PURE__ */ jsx(Weeks, {
      children: weeknumbers && weeknumbers.map((weeknumber) => /* @__PURE__ */ jsx(Week, {
        month,
        weekNumber: weeknumber,
        tasks: tasksWorkDays
      }, weeknumber))
    })]
  });
};
const Container$3 = He.article`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const TitleLine = He.div`
    display: flex;
    /* justify-content: center;
    align-items: center; */

    margin-bottom: 0.5rem;
    border: 1px solid black;

    background-color: #FFFFFF;
`;
const WeekTitle = He.div`
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px dashed black;

    width: 6rem;
    height: 3.125rem;

    font-size: 1rem;
    font-weight: bold;
`;
const Weeks = He.div`
    display: flex;
    flex-direction: column;

    border: 1px solid black;
`;

const months = [
  {
    "id": 1,
    "title": "Janeiro"
  },
  {
    "id": 2,
    "title": "Fevereiro"
  },
  {
    "id": 3,
    "title": "Mar\xE7o"
  },
  {
    "id": 4,
    "title": "Abril"
  },
  {
    "id": 5,
    "title": "Maio"
  },
  {
    "id": 6,
    "title": "Junho"
  },
  {
    "id": 7,
    "title": "Julho"
  },
  {
    "id": 8,
    "title": "Agosto"
  },
  {
    "id": 9,
    "title": "Setembro"
  },
  {
    "id": 10,
    "title": "Outubro"
  },
  {
    "id": 11,
    "title": "Novembro"
  },
  {
    "id": 12,
    "title": "Dezembro"
  }
];

const MonthTitle = (props) => {
  const {
    year,
    month,
    type,
    weekNumber,
    back,
    forward
  } = useGlobalContextState();
  return /* @__PURE__ */ jsxs(Container$2, {
    children: [/* @__PURE__ */ jsx("button", {
      onClick: () => back(),
      children: "<<"
    }), type === "TS" ? /* @__PURE__ */ jsx("h3", {
      children: `Semana ${weekNumber} - ${year}`
    }) : /* @__PURE__ */ jsx("h3", {
      children: `${months[month - 1].title} - ${year}`
    }), /* @__PURE__ */ jsx("button", {
      onClick: () => forward(),
      children: ">>"
    })]
  });
};
const Container$2 = He.article`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: 1rem;

    &>h3 {
        width: 10rem;

        text-align: center;
    }

    &>button {
        width:  2rem;
        height: 2rem;
    }
`;

const FilterBar = (props) => {
  const {
    filterTypes,
    filterType,
    filterOptions,
    filterValue,
    setFilterType,
    setFilterValue
  } = props;
  return /* @__PURE__ */ jsxs(Wrapper, {
    children: [/* @__PURE__ */ jsx(Field, {
      type: "select",
      options: filterTypes,
      name: "filterType",
      width: 20,
      value: filterType,
      onChange: setFilterType
    }), /* @__PURE__ */ jsx(Field, {
      type: "select",
      options: filterOptions,
      name: "filterValue",
      width: 20,
      value: filterValue,
      onChange: setFilterValue
    })]
  });
};
const Wrapper = He.div`
    display:            flex;
    justify-content:    space-between;
    margin:             0 2rem;

    width:              100ch;

    & > div {
        padding: 0;
        gap: 0;
    }
`;

function useFilterTabArr(props) {
  const { tabArr, typesOfFilters } = props;
  const [filterType, setFilterType] = react.exports.useState("");
  const [filterValue, setFilterValue] = react.exports.useState("");
  const [filterOptions, setFilterOptions] = react.exports.useState([]);
  const tabArrUnique = [...new Map(tabArr.map((item) => [item[filterType], item])).values()];
  react.exports.useEffect(() => {
    const options = [
      {
        label: "Todos",
        value: ""
      }
    ];
    if (filterType !== "")
      tabArrUnique.forEach(
        (row) => {
          options.push(
            {
              label: row[filterType.replace("Id", "Name")],
              value: row[filterType]
            }
          );
        }
      );
    setFilterOptions(options);
    setFilterValue("");
  }, [filterType]);
  const tabArrFiltrados = filterValue === "" ? tabArr : tabArr.filter((row) => row[filterType] === filterValue);
  return {
    FilterBar: () => FilterBar(
      {
        filterOptions,
        filterType,
        filterTypes: typesOfFilters,
        filterValue,
        setFilterType,
        setFilterValue
      }
    ),
    filteredProjects: tabArrFiltrados
  };
}

const Container$1 = He.table`
    display: flex;
    flex-direction: column;

    /* overflow: auto; */
    /* width: 300px; */

    width:  max-content;
`;
const Head = He.thead`
    display: inline-block;

    background-color: #3441AD;
    color: #FFFFFF;
    font-weight: bold;
`;
const Body = He.tbody`
    display: inline-block;
`;
const Row = He.tr`
    display: flex;

    background-color: #${(p) => p.color};
    color: ${(p) => p.color ? "#ffffff" : ""};
`;
const Cell = He.td`
    display: flex;
    align-items: center;
    justify-content: ${(p) => p.justify};

    border: 1px solid #EAEAEA;
    padding: 0 0.5rem;

    min-width: ${(p) => p.size}rem;
    height: 2rem;

    font-size: 0.8rem;

    &>a {
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 4px;

        width: 1.5rem;
        height: 1.5rem;

        box-shadow: 2px 2px 4px rgb(0 0 0 / 25%);

        cursor: pointer;

        &:hover {
            border: 1px solid hsl(200,100%,50%);

            color: hsl(200,100%,50%);
        }
    }
`;

const projectLength$1 = 12;
const clientPagLength$1 = 6;
const MonthTab = ({
  days,
  projects,
  tasksWorkDays,
  onDayClick,
  preview
}) => {
  return /* @__PURE__ */ jsxs(Container$1, {
    children: [/* @__PURE__ */ jsx(Head, {
      children: /* @__PURE__ */ jsxs(Row, {
        children: [/* @__PURE__ */ jsx(Cell, {
          size: projectLength$1,
          children: "Projeto"
        }), /* @__PURE__ */ jsx(Cell, {
          size: clientPagLength$1,
          children: "Cliente Rec."
        }), days && days.map((day) => /* @__PURE__ */ jsx(Cell, {
          size: 1.2,
          align: "center",
          children: day.dayText
        }, day.dayText)), /* @__PURE__ */ jsx(Cell, {
          size: 3,
          children: "Total"
        })]
      })
    }), /* @__PURE__ */ jsx(Body, {
      children: projects?.map((project) => {
        const tasks = tasksWorkDays.filter((task) => task.projectId === project.projectId);
        let total = 0;
        return /* @__PURE__ */ jsxs(Row, {
          children: [/* @__PURE__ */ jsx(Cell, {
            size: projectLength$1,
            children: project.projectName.substring(0, 40)
          }), /* @__PURE__ */ jsx(Cell, {
            size: clientPagLength$1,
            children: project.projectName.split(" ")[0].substring(0, 10)
          }), days?.map((day) => {
            const task = tasks.filter((task2) => task2.workday.format("DD") === day.id)[0];
            const workhours = task && (!task.preview || preview) ? task.workhours : 0;
            let backgroundColor = day.weekDay === 0 || day.weekDay === 6 ? "#dedede" : "#ffffff";
            backgroundColor = backgroundColor === "#ffffff" && workhours === 0 ? "#fffed5" : backgroundColor;
            total += workhours;
            return /* @__PURE__ */ jsx(Cell, {
              size: 1.2,
              justify: "center",
              onClick: () => onDayClick({
                id: task?.id,
                workday: day.workday,
                projectId: project.projectId
              }),
              style: {
                cursor: "pointer",
                backgroundColor,
                color: task?.preview ? "red" : "green"
              },
              children: workhours
            }, day.dayText);
          }), /* @__PURE__ */ jsx(Cell, {
            size: 3,
            justify: "space-around",
            style: {
              backgroundColor: "#dedede"
            },
            children: total
          })]
        }, project.projectName);
      })
    })]
  });
};

const projectLength = 12;
const clientPagLength = 6;
const HOURSLength = 4;
const AMOUNTLength = 5;
const SummaryTab = ({
  projects,
  tasksWorkDays,
  preview
}) => {
  let totalHrs = 0;
  let totalAmount = 0;
  return /* @__PURE__ */ jsxs(Container$1, {
    children: [/* @__PURE__ */ jsx(Head, {
      children: /* @__PURE__ */ jsxs(Row, {
        children: [/* @__PURE__ */ jsx(Cell, {
          size: projectLength,
          children: "Projeto"
        }), /* @__PURE__ */ jsx(Cell, {
          size: clientPagLength,
          children: "Cliente Rec."
        }), /* @__PURE__ */ jsx(Cell, {
          size: HOURSLength,
          children: "Total (H)"
        }), /* @__PURE__ */ jsx(Cell, {
          size: AMOUNTLength,
          children: "Total Liq. (\u20AC)"
        }), /* @__PURE__ */ jsx(Cell, {
          size: AMOUNTLength,
          children: "IVA (\u20AC)"
        }), /* @__PURE__ */ jsx(Cell, {
          size: AMOUNTLength,
          children: "Total Brt. (\u20AC)"
        })]
      })
    }), /* @__PURE__ */ jsxs(Body, {
      children: [projects?.map((project) => {
        const tasks = tasksWorkDays.filter((task) => task.projectId === project.projectId);
        let totalHrsProject = 0;
        let totalAmountProject = 0;
        tasks.forEach((task) => {
          totalHrsProject = totalHrsProject + task.workhours;
          totalAmountProject = totalAmountProject + task.workhours * project.rateValueHour;
        });
        totalHrs = totalHrs + totalHrsProject;
        totalAmount = totalAmount + totalAmountProject;
        return /* @__PURE__ */ jsxs(Row, {
          color: project.color,
          children: [/* @__PURE__ */ jsx(Cell, {
            size: projectLength,
            children: project.projectName.substring(0, 40)
          }), /* @__PURE__ */ jsx(Cell, {
            size: clientPagLength,
            children: project.projectName.split(" ")[0].substring(0, 10)
          }), /* @__PURE__ */ jsx(Cell, {
            size: HOURSLength,
            justify: "space-around",
            children: totalHrsProject
          }), /* @__PURE__ */ jsx(Cell, {
            size: AMOUNTLength,
            justify: "right",
            children: totalAmountProject.toFixed(2)
          }), /* @__PURE__ */ jsx(Cell, {
            size: AMOUNTLength,
            justify: "right",
            children: (totalAmountProject * 0.23).toFixed(2)
          }), /* @__PURE__ */ jsx(Cell, {
            size: AMOUNTLength,
            justify: "right",
            children: (totalAmountProject * 1.23).toFixed(2)
          })]
        }, project.projectName);
      }), /* @__PURE__ */ jsxs(Row, {
        children: [/* @__PURE__ */ jsx(Cell, {
          size: projectLength
        }), /* @__PURE__ */ jsx(Cell, {
          size: clientPagLength
        }), /* @__PURE__ */ jsx(Cell, {
          size: HOURSLength,
          justify: "space-around",
          style: {
            backgroundColor: "#dedede",
            fontWeight: "bold"
          },
          children: totalHrs
        }), /* @__PURE__ */ jsx(Cell, {
          size: AMOUNTLength,
          justify: "right",
          style: {
            backgroundColor: "#dedede",
            fontWeight: "bold"
          },
          children: totalAmount.toFixed(2)
        }), /* @__PURE__ */ jsx(Cell, {
          size: AMOUNTLength,
          justify: "right",
          style: {
            backgroundColor: "#dedede",
            fontWeight: "bold"
          },
          children: (totalAmount * 0.23).toFixed(2)
        }), /* @__PURE__ */ jsx(Cell, {
          size: AMOUNTLength,
          justify: "right",
          style: {
            backgroundColor: "#dedede",
            fontWeight: "bold"
          },
          children: (totalAmount * 1.23).toFixed(2)
        })]
      })]
    })]
  });
};

const TimeSheetTab = (props) => {
  const {
    year,
    month,
    type,
    weekNumber,
    tasksWorkDays,
    setSelectedTaskId,
    newTask
  } = useGlobalContextState();
  const [showPreview, setShowPreview] = react.exports.useState(false);
  const {
    projects
  } = useProjects();
  const mday = type === "TS" ? hooks().day("Sunday").week(weekNumber) : hooks(`${year}-${month}-01`);
  const lastDay = type === "TS" ? hooks().day("Saturday").week(weekNumber) : hooks(mday).endOf("month");
  const days = [];
  const qntdDays = lastDay.diff(mday, "d");
  for (let idx = 0; idx <= qntdDays; idx++) {
    days.push({
      id: mday.format("DD"),
      dayText: mday.format("DD"),
      weekDay: mday.weekday(),
      workday: hooks(mday)
    });
    mday.add(1, "d");
  }
  const typesOfFilters = [{
    label: "Sem filtro",
    value: ""
  }, {
    label: "Projeto",
    value: "projectId"
  }, {
    label: "Cliente Rec.",
    value: "receptorId"
  }, {
    label: "Cliente Pag.",
    value: "payerId"
  }];
  const {
    FilterBar,
    filteredProjects
  } = useFilterTabArr({
    tabArr: projects,
    typesOfFilters
  });
  filteredProjects.sort((a, b) => a.projectName.localeCompare(b.projectName));
  const handleClick = ({
    id,
    workday,
    projectId
  }) => {
    if (id)
      setSelectedTaskId(id);
    else
      newTask({
        workday,
        projectId
      });
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx(Field, {
      name: "preview",
      type: "checkbox",
      value: showPreview ? "X" : "",
      onChange: (v) => setShowPreview(v === "X")
    }), /* @__PURE__ */ jsx(FilterBar, {}), /* @__PURE__ */ jsx(MonthTab, {
      days,
      projects: filteredProjects,
      tasksWorkDays,
      onDayClick: handleClick,
      preview: showPreview
    }), /* @__PURE__ */ jsx(SummaryTab, {
      projects: filteredProjects,
      tasksWorkDays,
      preview: showPreview
    })]
  });
};

const TimeSheetPage = (props) => {
  const {
    type,
    setType
  } = useGlobalContextState();
  const Render = () => {
    switch (type) {
      case "CL":
        return /* @__PURE__ */ jsx(Calendar, {});
      default:
        return /* @__PURE__ */ jsx(TimeSheetTab, {});
    }
  };
  const tipos = [{
    label: "Calend\xE1rio",
    value: "CL"
  }, {
    label: "Tabela - M\xEAs",
    value: "TM"
  }, {
    label: "Tabela - Semana",
    value: "TS"
  }];
  return /* @__PURE__ */ jsxs(Container, {
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        width: "300px"
      },
      children: /* @__PURE__ */ jsx(Field, {
        type: "select",
        name: "tipo",
        label: "TimeSheet",
        value: type,
        options: tipos,
        onChange: (v) => setType(v)
      })
    }), /* @__PURE__ */ jsx(MonthTitle, {}), Render()]
  });
};
const Container = He.section`
    /* display: grid;

    grid-template-columns: auto auto; */
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &>h3 {
        display: flex;
        align-items: center;

        padding: 0 1rem;

        height: 2rem;

    }
`;

const TimeSheet = () => {
  return /* @__PURE__ */ jsxs(Provider, {
    children: [/* @__PURE__ */ jsx(TimeSheetPage, {}), /* @__PURE__ */ jsx(ProjectForm, {})]
  });
};

export { TimeSheet as default, jsx as j };
