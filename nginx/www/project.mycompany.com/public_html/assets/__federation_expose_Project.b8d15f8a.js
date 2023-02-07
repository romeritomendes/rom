import {importShared} from './__federation_fn_import.js'
const {default:He} = await importShared('styled-components')

const {r:react} = await importShared('react')

const {default:axios} = await importShared('axios')


const Container$7 = He.article`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Head = He.div`
    display: flex;

    background-color: #3441AD;
    color: #FFFFFF;
    font-weight: bold;
`;
const Body = He.div`
    display: flex;
    flex-direction: column;

    width: 100%;
`;
const Row = He.div`
    display: flex;
    `;
const Cell = He.div`
    display: flex;
    align-items: center;
    justify-content: ${(p) => p.align};

    border: 1px solid #EAEAEA;
    padding: 0 0.5rem;

    width: ${(p) => p.size}rem;
    min-width: 4rem;
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

const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;

const TableList = ({
  projetos,
  handleDel,
  handleEdit
}) => {
  const projectLength = 12;
  const clientPagLength = 6;
  const actionLength = 7;
  return /* @__PURE__ */ jsxs(Container$7, {
    children: [/* @__PURE__ */ jsxs(Head, {
      children: [/* @__PURE__ */ jsx(Cell, {
        size: projectLength,
        children: "Projeto"
      }), /* @__PURE__ */ jsx(Cell, {
        size: clientPagLength,
        children: "Cliente Pag."
      }), /* @__PURE__ */ jsx(Cell, {
        children: "Taxa (D)"
      }), /* @__PURE__ */ jsx(Cell, {
        children: "Taxa (H)"
      }), /* @__PURE__ */ jsx(Cell, {
        size: 7
      })]
    }), /* @__PURE__ */ jsx(Body, {
      children: projetos?.map((projeto) => /* @__PURE__ */ jsxs(Row, {
        children: [/* @__PURE__ */ jsx(Cell, {
          size: projectLength,
          children: projeto.name.substring(0, 30)
        }), /* @__PURE__ */ jsx(Cell, {
          size: clientPagLength,
          children: projeto.payerName
        }), /* @__PURE__ */ jsx(Cell, {
          align: "right",
          children: projeto.rateValueDay.toFixed(2)
        }), /* @__PURE__ */ jsx(Cell, {
          align: "right",
          children: projeto.rateValueHour.toFixed(2)
        }), /* @__PURE__ */ jsxs(Cell, {
          size: actionLength,
          align: "space-around",
          children: [/* @__PURE__ */ jsx("a", {
            onClick: () => handleDel(projeto._id ? projeto._id : "noID"),
            children: "del"
          }), /* @__PURE__ */ jsx("a", {
            onClick: () => handleEdit(projeto._id ? projeto._id : "noID"),
            children: "edit"
          })]
        })]
      }, projeto._id))
    })]
  });
};

const Button = He.button`
    border: 0.1px solid #000000;
    border-radius: 4px;

    width:  ${(p) => p.size ? p.size : 5}rem;
    min-height: 2.563rem;

    background: #FCFCFC;

    box-sizing: border-box;

    font-weight: bold;
    text-align: ${(p) => p.align ? p.align : "center"};

    cursor: pointer;

    &:focus, &:hover {
        border-color: hsl(200, 100%, 50%);
        color: hsl(200, 100%, 50%);
    }
`;

const Input = (props) => {
  return /* @__PURE__ */ jsx(Container$6, {
    ...props
  });
};
const Container$6 = He.input`
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

const BASE_URL = "http://localhost:4300/";

const Select = ({
  options,
  value,
  onChange,
  required
}) => {
  const [show, setShow] = react.exports.useState(false);
  const selectedOption = options.find((o) => o.value === value);
  const handleClick = (itemValue) => {
    onChange(itemValue);
    setShow(false);
  };
  return /* @__PURE__ */ jsxs(Container$5, {
    tabIndex: 0,
    children: [/* @__PURE__ */ jsx(Value, {
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
const Container$5 = He.article`
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
  onChange,
  required
}) => {
  const handlerChangeNumber = (value2) => {
    let newValue = value2 === "" ? "0" : value2.replace(/\D/g, "");
    return newValue;
  };
  if (type === "select" && options) {
    return /* @__PURE__ */ jsxs(Container$4, {
      width,
      children: [/* @__PURE__ */ jsx("label", {
        htmlFor: name,
        children: label
      }), /* @__PURE__ */ jsx(Select, {
        options,
        value,
        onChange,
        required
      })]
    });
  }
  return /* @__PURE__ */ jsxs(Container$4, {
    width,
    children: [/* @__PURE__ */ jsx("label", {
      htmlFor: name,
      children: label
    }), /* @__PURE__ */ jsx(Input, {
      type: type === "date" ? type : "text",
      name,
      value,
      onChange: (e) => onChange(type === "number" ? handlerChangeNumber(e.target.value) : e.target.value),
      style: {
        textAlign: type === "number" ? "right" : "left"
      },
      required
    })]
  });
};
const Container$4 = He.div`
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

const ProjectForm = ({
  handleClose,
  project
}) => {
  const [projectName, setProjectName] = react.exports.useState(project.name);
  const [payerId, setPayerId] = react.exports.useState(project.payerId);
  const [receptorId, setReceptorId] = react.exports.useState(project.receptorId);
  const [color, setColor] = react.exports.useState(project.color);
  const [type, setType] = react.exports.useState(project.type);
  const [clientList, setClientList] = react.exports.useState([]);
  react.exports.useEffect(() => {
    const uri = `${BASE_URL}customer`;
    axios.get(uri).then((res) => {
      setClientList(res.data.rows);
    });
  }, []);
  const payerList = clientList.filter((row) => row.type === "payer").map((row) => ({
    label: row.name,
    value: row._id
  }));
  const receptorList = clientList.filter((row) => row.type === "receptor").map((row) => ({
    label: row.name,
    value: row._id
  }));
  const typeList = [{
    label: "SAP ABAP",
    value: "SAP ABAP"
  }];
  const payer = clientList.filter((client) => client._id === payerId)[0];
  const save = () => {
    let uri = `${BASE_URL}project`;
    const payload = {
      _id: project._id,
      name: projectName,
      type,
      shortname: projectName.split(" ")[0].substring(0, 12),
      color,
      payerId,
      receptorId,
      rateValueDay: payer.rateValueDay ? payer.rateValueDay : payer.rateValue,
      rateValueHour: payer.rateValueHour ? payer.rateValueHour : payer.rateValue / 8
    };
    if (project._id === void 0) {
      axios.post(uri, payload).then((res) => {
        handleClose();
        alert("Projeto Salvo!");
      }).catch((err) => {
        console.log(err);
        alert("Error ao gravar projeto!");
      });
    } else {
      uri = `${uri}/${project._id}`;
      axios.put(uri, payload).then((res) => {
        handleClose();
        alert("Projeto Salvo!");
      }).catch((err) => {
        console.log(err);
        alert("Error ao gravar projeto!");
      });
    }
  };
  return /* @__PURE__ */ jsxs(Container$3, {
    children: [/* @__PURE__ */ jsx(Field, {
      label: "Projeto",
      name: "project",
      value: projectName,
      onChange: setProjectName,
      required: true
    }), /* @__PURE__ */ jsx(Field, {
      type: "select",
      label: "Tipo",
      name: "type",
      value: type,
      onChange: setType,
      options: typeList,
      required: true
    }), /* @__PURE__ */ jsx(Field, {
      type: "select",
      label: "Ciente Rec.",
      name: "receptorId",
      value: receptorId,
      onChange: setReceptorId,
      options: receptorList,
      required: true
    }), /* @__PURE__ */ jsx(Field, {
      type: "select",
      label: "Ciente Pag.",
      name: "payerId",
      value: payerId,
      onChange: setPayerId,
      options: payerList,
      required: true
    }), /* @__PURE__ */ jsx(Field, {
      label: "Cor",
      name: "color",
      value: color,
      onChange: setColor,
      required: true
    }), /* @__PURE__ */ jsx(Button, {
      onClick: save,
      children: "Salvar"
    })]
  });
};
const Container$3 = He.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Dialog = ({
  onClose,
  title,
  Form,
  customProps
}) => {
  return /* @__PURE__ */ jsx(Container$2, {
    children: /* @__PURE__ */ jsxs(Wrapper, {
      children: [/* @__PURE__ */ jsxs(ToolBar$1, {
        children: [/* @__PURE__ */ jsx("span", {
          children: title
        }), /* @__PURE__ */ jsx("button", {
          onClick: onClose,
          children: "X"
        })]
      }), /* @__PURE__ */ jsx(Form, {
        handleClose: onClose,
        ...customProps
      })]
    })
  });
};
const Container$2 = He.div`
    position: absolute;
    display: flex;
    justify-content: center;

    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    /* background-color: #ca3c3c;
    opacity: 50%; */
    background-color: rgb(255 255 255 / 50%);
`;
const Wrapper = He.div`
    position: absolute;
    top: 100px;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 0.5rem;

    display: flex;
    flex-direction: column;

    gap: 1rem;

    background-color: #FFFFFF;
    box-shadow: 2px 2px 4px rgb(0 0 0 / 25%);
    opacity: 100%;
`;
const ToolBar$1 = He.div`
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;

    &>span {
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    &>button {
        border: none;
        background: none;

        font-weight: bold;
        text-align: center;
        font-size: 0.7rem;

        cursor: pointer;

        &:hover {
            border: 1px solid hsl(200,100%,50%);
            color: hsl(200,100%,50%);
        }
    }
`;

const NEW_PROJECT = {
  _id: void 0,
  name: "",
  type: "SAP ABAP",
  payerId: "",
  payerName: "",
  receptorId: "",
  receptorName: "",
  rateValueDay: 0,
  rateValueHour: 0,
  color: ""
};
const ProjectPage = (props) => {
  const [projetos, setProjetos] = react.exports.useState([]);
  const [search, setSearch] = react.exports.useState("");
  const [selectedId, setSelectedId] = react.exports.useState("");
  const [dialog, showDialog] = react.exports.useState(false);
  react.exports.useEffect(() => {
    const uri = `${BASE_URL}project`;
    axios.get(uri).then((res) => {
      const projetosRes = res.data.rows.map((row) => ({
        _id: row._id,
        name: row.name,
        type: row.type,
        color: row.color ? `${row.color}` : `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        payerId: row.payerId,
        receptorId: row.receptorId,
        payerName: row.payer.name,
        receptorName: row.receptor.name,
        rateValueDay: row.rateValueDay ? row.rateValueDay : 0,
        rateValueHour: row.rateValueHour ? row.rateValueHour : 0
      }));
      setProjetos(projetosRes);
    }).catch((err) => {
      console.log(err);
    });
  }, [dialog]);
  const filteredProject = projetos.filter((projeto) => projeto.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || projeto.payerName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || projeto.receptorName.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  const handleClose = () => {
    setSelectedId(void 0);
    showDialog(false);
  };
  const handleDel = (id) => {
    if (dialog)
      return;
    const uri = `${BASE_URL}project/${id}`;
    axios.delete(uri).then((res) => {
      setProjetos((p) => p.filter((projeto) => projeto._id !== id));
      alert("Projeto Eliminado!");
    }).catch((err) => {
      console.log(err);
      alert("Erro ao eliminar o Projeto!");
    });
  };
  const handleEdit = (id) => {
    if (dialog)
      return;
    setSelectedId(id);
    showDialog(true);
  };
  const handleNew = () => {
    if (dialog)
      return;
    setSelectedId(void 0);
    showDialog(true);
  };
  const selectedProject = selectedId ? projetos.filter((projeto) => projeto._id === selectedId)[0] : NEW_PROJECT;
  return /* @__PURE__ */ jsxs(Container$1, {
    children: [/* @__PURE__ */ jsxs(ToolBar, {
      children: [/* @__PURE__ */ jsxs("div", {
        children: [/* @__PURE__ */ jsx(Button, {
          size: 8,
          onClick: handleNew,
          children: "+ Novo Projeto"
        }), /* @__PURE__ */ jsx(Button, {
          children: "Importar"
        }), /* @__PURE__ */ jsx(Button, {
          children: "Exportar"
        })]
      }), /* @__PURE__ */ jsx(Input, {
        placeholder: "Pesquisar por Cliente ou Projeto",
        value: search,
        onChange: (e) => setSearch(e.target.value)
      })]
    }), /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsxs(FilterBar, {
        children: [/* @__PURE__ */ jsx(Button, {
          size: 8,
          align: "left",
          children: "Op\xE7\xF5es"
        }), /* @__PURE__ */ jsx(Button, {
          size: 13.2,
          align: "left",
          children: "Filtro por Projeto"
        })]
      }), /* @__PURE__ */ jsx(TableList, {
        projetos: filteredProject,
        handleDel,
        handleEdit
      })]
    }), dialog && /* @__PURE__ */ jsx(Dialog, {
      onClose: handleClose,
      title: "Novo Projeto",
      Form: ProjectForm,
      customProps: {
        project: selectedProject
      }
    })]
  });
};
const Container$1 = He.article`
    position: relative;
    
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ToolBar = He.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
const FilterBar = He.div`
    display: flex;
    justify-content: space-between;
`;

const Project = () => {
  return /* @__PURE__ */ jsx(Container, {
    children: /* @__PURE__ */ jsx(ProjectPage, {})
  });
};
const Container = He.div`
    padding: 15px;
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);

    width: 618px;
`;

export { Project as default, jsx as j };
