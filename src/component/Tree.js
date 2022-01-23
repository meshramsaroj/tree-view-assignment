import axios from "axios";
import { useEffect, useState } from "react";
import TreeNode from "./TreeNode";

const Tree = () => {
    const [data, setData] = useState([]);
    const [childVisible, setChildVisible] = useState(false);


    const fetchData = async () => {
        const body = { level: 1 };
        const header = { 'Content-Type': 'application/json' }
        const res = await axios.post("https://poc.molecularconnections.com/Tree/getTerm", body, { headers: header }).catch(err => console.log(err));
        setData(res.data)
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="d-flex justify-content-center mt-5">
            {(data) ? (
                <div>
                    <ul>
                        <div className="d-tree-head">
                            <div className="d-flex" onClick={() => setChildVisible(v => !v)}>
                                {data.child && (
                                    <div className={`d-inline d-tree-toggler ${childVisible ? "active" : ""}`}>
                                        {childVisible ? (<i className="far fa-minus-square text-secondary"></i>) : (<i className="far fa-plus-square text-secondary"></i>)}
                                        {childVisible ? (<i className="fa fa-folder-open mx-2 text-warning" aria-hidden="true"></i>) : (<i className="fa fa-folder mx-2 text-warning" aria-hidden="true"></i>)}
                                    </div>
                                )}

                                <div className="col d-tree-head">
                                    {data.name}
                                </div>
                            </div>
                            <ul>
                                {data.child && childVisible && data.children.map(child => <TreeNode childData={child} data={data} key={child.name} />)}
                            </ul>
                        </div>
                    </ul>
                </div>
            ) : "Not Found"}
        </div>

    );
}

export default Tree;