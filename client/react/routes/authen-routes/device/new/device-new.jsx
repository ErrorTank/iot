import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {DeviceForm} from "../device-form/device-form";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {deviceApi} from "../../../../../api/common/device-api";
import {userInfo} from "../../../../../common/states/user-info";
import {customHistory} from "../../../routes";

export class DeviceNew extends React.Component {
  constructor(props) {
    super(props);
    this.defaultData = {
      deviceName: "",
      deviceDescription: "",
      lat: 21.028511,
      lng: 105.804817
    };
    this.state = {
      data: {...this.defaultData},
      loading: true
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          data: {...this.defaultData, lat: position.coords.latitude, lng: position.coords.longitude},
          loading: false
        })
      });
    } else {
      this.setState({loading: false})
    }
  };

  handleCreate = () => {
    let {data} = this.state;
    this.setState({loading: true});
    deviceApi.addNewUserDevice(userInfo.getState()._id, {...data}).then((newDevice) => customHistory.push("/device/" + newDevice._id+"/edit"))
  };

  render() {
    let {data, loading} = this.state;
    return (
      <PageTitle
        title={"Tạo mới thiết bị"}
      >
        <div className={"container"}>
          <div className="device-new-route">
            {loading && (
              <LoadingInline/>
            )}
            <p className="dn-title">Tạo mới thiết bị</p>
            <DeviceForm
              data={data}
              onChange={newData => this.setState({data: newData})}
            />
            <div className="text-right mt-5">
              <button className="btn btn-primary create-btn" onClick={this.handleCreate}>Tạo</button>
            </div>
          </div>
        </div>

      </PageTitle>
    );
  }
}