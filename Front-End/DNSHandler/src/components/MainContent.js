import React from 'react';
import Table from './Table';
import CustomRecordsTable from './CustomRecordsTable';
const MainContent = () => {
    return (
        <div>
            <header className="main-heading">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="page-title">
                                <h3>Add Custom Domain Names</h3>
                                <h6 className="sub-heading">Welcome to DNSHandler</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="main-content">
                <div className="row gutters">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="section-container">
                            <p className="section-title">Add Name Servers</p>
                            <Table />
                        </div>

                            <CustomRecordsTable />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
