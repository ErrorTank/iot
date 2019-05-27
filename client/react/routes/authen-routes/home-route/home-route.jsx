import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {DataTable} from "../../../common/data-table/data-table";
import {customHistory} from "../../routes";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {deviceApi} from "../../../../api/common/device-api";
import {userInfo} from "../../../../common/states/user-info";
import {GGMap} from "../../../common/gg-map/gg-map";

export class HomeRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      devices: [],

    };
    deviceApi.getUserDevices(userInfo.getState()._id).then((devices) => this.setState({devices, loading: false}))
  };

  columns = [
    {
      label: "ID",
      cellDisplay: (device, i) => i + 1,
    }, {
      label: "Device name",
      cellDisplay: device => device.deviceName,
    }, {
      label: "Description",
      cellDisplay: device => device.deviceDescription,
    },{
      label: "Actions",
      cellDisplay: device => (
        <div className="device-actions">
          <button className="btn btn-primary" onClick={() => customHistory.push(`/device/${device._id}/view`)}>View</button>
          <button className="btn btn-secondary" onClick={() => {
            customHistory.push(`/device/${device._id}/edit`)
          }}>Edit</button>
          <button className="btn btn-danger" onClick={() => {
            this.setState({devices: this.state.devices.filter(each => each._id !== device._id)});
            deviceApi.deleteUserDevice(userInfo.getState()._id, device._id)

          }}>Delete</button>
        </div>
      ),
    }
  ];
  renderHeader = (column, index) => (
    <th className={column.cellClass} key={index}>
      {column.label}
    </th>
  );

  render() {
    return (
      <PageTitle
        title="Trang chủ"
      >
        <div className="home-route container">
          {this.state.loading ? (
            <LoadingInline/>
          ) : (
            <div className="table-wrapper">
              <p className="h-title">Thiết bị có sẵn</p>
              <div className="table-actions">
                <button className="btn btn-primary add-more" onClick={() => customHistory.push("/device/new")}>Thêm thiết bị</button>
              </div>
              <DataTable
                className={"device-list"}
                columns={this.columns}
                renderHeaderCell={this.renderHeader}
                placeholder={"Không có thiêt bị nào"}
                rows={this.state.devices}
                _rowTrackBy={(row) => row._id}
              />
              <div className="mt-5">
                <GGMap
                  markers={this.state.devices.map(each => ({lat: each.lat, lng: each.lng}))}
                  zoom={1}

                />
              </div>
            </div>

          )

          }

        </div>
      </PageTitle>

    );
  }
}