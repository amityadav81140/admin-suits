import React from 'react';
// import { Table } from 'antd';
import { Table } from "ant-table-extensions";

const Datatable = (props) => {

    // const tableData = {...props.table}

    return (
        <React.Fragment>
            <p className='text-end me-3 text-sm'>*To search in status field type <span className='secondary-color'>1</span> for <span className='secondary-color'>"active"</span> & <span className='secondary-color'>0</span> for <span className='secondary-color'>"hidden"</span></p>
            {<Table columns={props.columns} dataSource={props.data} exportable searchable />}
        </React.Fragment>
    );
};

export default Datatable;