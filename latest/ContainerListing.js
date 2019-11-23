class FilterableContainerListingBox extends React.Component {
  render() {
    return (
      <ContainerListingList />
    )
  }
}

class ContainerListingList extends React.Component {
  render() {
    console.log("ContainerListingList sees lxcs as: ");
    console.log(lxcs)
    return (

      <ContainerListingRow containers={lxcs}/>

    )
  }
}

class ContainerListingRow extends React.Component {

  constructor() {
    super();

    this.state = {
      showContainers: false,
      containers: [],
      container_stats: []
    };
  }

  componentWillMount() {
    this._fetchContainers();
    var test = this._fetchContainers();
    console.log("fetched containers")
    console.log(test)
  }

  render() {
    const containers_row = this._getContainers();
    console.log("Container Listing Row sees this.props.containers as: ")
    console.log(this.props.containers)
    return (

      <div className="table loading-more">
        <table>
          <thead>
          <tr>
            <th className="name">Container name</th>
            <th>Host</th>
            <th>Host ring</th>
            <th>Owner</th>
            <th>CPU</th>
            <th>Network</th>
            <th>Memory</th>
            <th>Disk</th>
          </tr>
          </thead>
          {containers_row}


        </table>
        <ul className="pagination">
          <li className="current"><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
        </ul>
        <div className="load-more">
          <a href="#" className="btn btn-blue less">Show less</a>
          <a href="#" className="btn btn-blue more">Show more</a>
        </div>
      </div>


    )
  }

  _fetchContainers() {
    $.ajax({
      method: 'GET',
      url: "http://localhost:3000/api/container_stats/current",
      success: (containers) => {
        this.setState({
          containers
        })
      }
    });
  }

  _getContainers() {
    return this.state.containers.map((containers) => {
      return (<ContainerItem key={containers._id}
                             name={containers.Names}
                             status={containers.Status}
                             uptime={containers.Status}
                             host={containers.host_dns}
                             cpustats={containers.cpu_stats}
                             memorystats={containers.memory_stats}
                             diskstats={containers.blkio_stats}
                             networkstats={containers.network}/>);
    });

  }

}


var containerToDiskIO = {};
class ContainerItem extends React.Component {
  render() {
    console.log("CONTAINER: " + this.props.name)
    var newname = this.props.name
//        var newname2=newname.substring(0,2)
    console.log("NEW CONTAINER NAME: ")
    console.log(newname.toString().substring(0, 16))
    var cpu_stats = this.props.cpustats
    console.log("logging cpu_stats ")
    console.log(cpu_stats)
    console.log("logging cpu_stats cpu_usage")
    console.log(cpu_stats[0].cpu_usage)
    console.log("logging cpu_stats cpu_usage total_usage ")
    console.log(cpu_stats[0].cpu_usage[0].total_usage)
    console.log("logging cpu_stats system_cpu_usage ")
    console.log(cpu_stats[0].system_cpu_usage)
    console.log("logging CONTAINER UTILIZATION")

//MAYBEWORKS        var cpu_util = (cpu_stats[0].cpu_usage[0].total_usage/cpu_stats[0].system_cpu_usage)*100 +"%"
    var cpu_util = Math.round((cpu_stats[0].cpu_usage[0].total_usage / cpu_stats[0].system_cpu_usage) * 100 * 100) / 100
    console.log(cpu_util)

    console.log("logging network_stats")
    console.log(this.props.networkstats)
    console.log("logging network_stats tx_bytes")
    console.log(this.props.networkstats.tx_bytes)
    var net_tx_bytes = this.props.networkstats.tx_bytes
    console.log("logging network_stats rx_bytes")
    var net_rx_bytes = this.props.networkstats.rx_bytes
    console.log(this.props.networkstats.rx_bytes)
    console.log("memory stats")
    console.log(this.props.memorystats)
    console.log("memory stats usage")
    console.log(this.props.memorystats[0].usage)
    var mem_usage = this.props.memorystats[0].usage
    console.log("memory stats limit")
    console.log(this.props.memorystats[0].limit)
    var mem_limit = this.props.memorystats[0].limit
    console.log("memory stats stats")
    console.log(this.props.memorystats[0].stats)
    var mem_util = Math.round((mem_usage / mem_limit) * 100 * 100) / 100
    console.log("memory utilization = " + (mem_util) + "%")
//        console.log("logging disk_stats")
//        console.log(this.props.diskstats[0].io_service_bytes_recursive)
//        var io_service_bytes_recursive = this.props.diskstats[0].io_service_bytes_recursive

//            
//        $.each(io_service_bytes_recursive, function(i, v) {
//    if ((v.major == 253) && (v.op == "Read") && (v.minor > 0)) {
//        console.log("Found Read on " + newname + " disk " + v.major + " " + v.minor + " with " + v.op + " operations at " + v.value);
////        FAILcontainerToDiskIO.(newname) = v.value
//        
////        containerToDiskIO.push({
////    key:   newname,
////    value: v.value
////});
//        
////        containerToDiskIO[newname] = v.value;
////        containerToDiskIO.push({newname: v.value})
//        
//        var keyname = newname
//        containerToDiskIO[keyname] = v.value
//        
//        
////        console.log(containerToDiskIO)
////        name_norm= this.props.name.substring(0, 12);
////        console.log("Shortened name is: " + name_norm)
////        
//        return;
//        
//        
//    }
//                if ((v.major == 253) && (v.op == "Write") && (v.minor > 0)) {
//        console.log("Found Write on  " + newname + " disk " + v.major + " " + v.minor + " with " + v.op + " operations at " + v.value);
//        
////        name_norm= this.props.name.substring(0, 12);
////        console.log("Shortened name is: " + name_norm)
////        
//        return;
//        
//        
//    }
//});
//            console.log("containerToDiskIO")
//       console.log(containerToDiskIO) 
//       var containerToDiskIOitems = Object.keys(containerToDiskIO).map(function(key) {
//    return [key, containerToDiskIO[key]];
//           });
//            console.log("containerToDiskIOitems")
//            console.log(containerToDiskIOitems)
//            
//            
//            containerToDiskIOitems.sort(function(first, second) {
//    return second[1] - first[1];
//});
//            console.log("containerToDiskIOitems sorted")
//            console.log(containerToDiskIOitems)
//       console.log(containerToDiskIOitems.slice(0, 5));
    return (

      <tbody>
      <tr>
        <td className="name"><a href="#">{this.props.name}</a></td>
        <td>{this.props.host}</td>
        <td>HOST_RING_123</td>
        <td>Jason Richards</td>
        <td>{cpu_util}%</td>
        <td>{net_tx_bytes}b / {net_rx_bytes}b</td>
        <td>{mem_util}%</td>
        <td>145</td>
      </tr>
      </tbody>

    );
  }

}

var LXCURL = "http://127.0.0.1:3000/api/container_infos/current"
var ContainersData = jQuery.ajax({
  url: LXCURL,
  async: false,
  dataType: 'json'
}).responseText

console.log("Getting container_infos");
console.log(ContainersData);

var lxcs = jQuery.parseJSON(ContainersData);
console.log("LXCs is: ");
console.log(lxcs);

ReactDOM.render(
  <FilterableContainerListingBox />,
  document.getElementById('FilterableContainerListingBoxcontainer')
);
