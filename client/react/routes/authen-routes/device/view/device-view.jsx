import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {deviceApi} from "../../../../../api/common/device-api";
import {userInfo} from "../../../../../common/states/user-info";
import socket from "../../../../../common/socket/socket"
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {Armcharts} from "../../../../common/charts/charts";
import omit from "lodash/omit"

export class DeviceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true
    };

    deviceApi.getUserDevice(userInfo.getState()._id, props.match.params.deviceID).then(data => {
      this.setState({data, loading: false});
      socket.on("dataChange", newData => {
        console.log(newData)
        this.setState({data: newData});
      })


    })
  };

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

                <Armcharts paddingRight={20} data={data.dataHistory.map(each => ({...omit(each, ["_id"]), time: new Date(each.time)}))}/>
              </div>
            )}

          </div>
        </div>
      </PageTitle>
    );
  }
}