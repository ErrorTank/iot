import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {deviceApi} from "../../../../../api/common/device-api";
import {userInfo} from "../../../../../common/states/user-info";
import socket from "../../../../../common/socket/socket"
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";

export class DeviceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true
    };

    deviceApi.getUserDevice(userInfo.getState()._id, props.match.params.deviceID).then(data => {
      this.setState({data});
      socket.emit("join room", {deviceID: data._id}, () => {
        console.log("Join room success!");
        this.setState({loading: false});
        socket.on("dataChange", newData => {
          this.setState({data: newData});
        })
      });


    })
  };

  componentWillUnmount() {
    socket.emit("leave room", {deviceID: this.state.data._id})
  }

  render() {
    let {data, loading} = this.state;
    console.log(data);
    return (
      <PageTitle
        title="Tra cứu dữ liệu"
      >
        <div className="container">
          <div className="device-view-route">
            {loading && (
              <LoadingInline/>
            )}
            {data && (
              <div>
                <p className="dn-title">Tra cứu dữ liệu</p>
                {data.dataHistory.map((each, key) => (
                  <p style={{color: "#4a4a4a"}} key={key}>
                    {JSON.stringify(each)}
                  </p>
                ))}
              </div>
            )}

          </div>
        </div>
      </PageTitle>
    );
  }
}