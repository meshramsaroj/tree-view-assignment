
import React, { useState } from 'react';

const TreeNode = ({ childData, data }) => {
    const [childVisible, setChildVisible] = useState(false);

    const ChildNodeList = (terms) => <div>
        {terms.terms.map(term => (
            <li key={term.nodeid}><i className="far fa-plus-square text-secondary"></i> <i className="fa fa-folder mx-2 text-warning" aria-hidden="true"></i>{term.name}</li>
        ))}
    </div>

    return (
        <li className="d-tree-node border-0 my-2">
            <div className="d-flex" onClick={() => setChildVisible(v => !v)}>
                {childData.child && (
                    <div className={`d-inline d-tree-toggler ${childVisible ? "active" : ""}`}>
                        {childVisible ? (<i className="far fa-minus-square text-secondary"></i>) : (<i className="far fa-plus-square text-secondary"></i>)}
                        {childVisible ? (<i className="fa fa-folder-open mx-2 text-warning" aria-hidden="true"></i>) : (<i className="fa fa-folder mx-2 text-warning" aria-hidden="true"></i>)}
                    </div>
                )}

                <div className="col d-tree-head">
                    {childData.name}
                </div>
            </div>

            {childData.child && childVisible && (
                <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
                        {data.termsrelation.map(d => (
                            <div key={d.rel}>
                                {d.rel === childData.name && (
                                    <ChildNodeList terms={d.terms} />
                                )}
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    )
};

export default TreeNode;
