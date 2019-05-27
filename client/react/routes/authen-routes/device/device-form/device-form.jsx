import React from "react";
import {InputBase} from "../../../../common/base-input/base-input";
import {GGMap} from "../../../../common/gg-map/gg-map";

export class DeviceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  };

  render() {
    let {data, onChange} = this.props;
    return (
      <div className="device-form">
        <InputBase
          className="d-input pt-0"

          onChange={e => {
            onChange({...data, deviceName: e.target.value});
          }}
          type={"text"}
          label={"Tên thiết bị"}
          value={data.deviceName}
        />
        <InputBase
          className="d-input pt-0"

          onChange={e => {
            onChange({...data, deviceDescription: e.target.value});
          }}
          inputType={"textarea"}
          type={"text"}
          label={"Mô tả"}
          value={data.deviceDescription}
        />


        <GGMap
          position={{lat: data.lat, lng: data.lng}}
          markers={[{lat: data.lat, lng: data.lng}]}
        />
        <InputBase
          className="d-input pt-0"

          onChange={e => {
            onChange({...data, lat: e.target.value ? parseFloat(e.target.value) : 0});
          }}
          type={"text"}
          label={"Latitude"}
          value={data.lat}
        />
        <InputBase
          className="d-input pt-0"

          onChange={e => {
            onChange({...data, lng: e.target.value ? parseFloat(e.target.value) : 0});
          }}
          type={"text"}
          label={"Longitude"}
          value={data.lng}
        />
      </div>
    );
  }
}