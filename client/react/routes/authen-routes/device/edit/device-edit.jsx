import React from "react";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {DeviceForm} from "../device-form/device-form";
import {PageTitle} from "../../../../common/page-title/page-title";
import {deviceApi} from "../../../../../api/common/device-api";
import {userInfo} from "../../../../../common/states/user-info";
import {customHistory} from "../../../routes";

export class DeviceEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true
    };

    deviceApi.getUserDevice(userInfo.getState()._id, props.match.params.deviceID).then(data => {
      this.setState({data, loading: false})
    })
  };

  handleEdit = () => {
    let {data} = this.state;
    this.setState({loading: true});
    deviceApi.editUserDevice(userInfo.getState()._id, this.props.match.params.deviceID ,{...data}).then((newDevice) => this.setState({loading: false}))
  };

  render() {
    let {data, loading} = this.state;
    return (
      <PageTitle
        title={"Sửa thông tin thiết bị"}
      >
        <div className={"container"}>
          <div className="device-edit-route">
            {loading && (
              <LoadingInline/>
            )}
            <p className="dn-title">Sửa thông tin thiết bị</p>
            {data && (
              <div>

                <DeviceForm
                  data={data}
                  onChange={newData => this.setState({data: newData})}
                />
                <div className="text-right mt-5">
                  <button className="btn btn-primary create-btn" onClick={this.handleEdit}>Sửa</button>
                </div>
              </div>
            )}


          </div>
        </div>

      </PageTitle>
    );
  }
}