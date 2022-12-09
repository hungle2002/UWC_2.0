import Table from "react-bootstrap/Table";
import ReactMapGL, { Marker } from "react-map-gl";
import { useState, useEffect } from "react";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap/";

const MCPsList = () => {
  const [viewport, setViewport] = useState({});
  const [mcps, setMcps] = useState([]);
  const [markers, setMarkers] = useState([]);
  const theads = [
    { id: "id", label: "MCP" },
    { id: "address", label: "Địa chỉ" },
    { id: "janitors", label: "Janitors" },
  ];
  const { id } = useParams();
  const navigate = useNavigate();
  const handleJanitorsList = (id, index) => {
    const url = `/mcp/${id}`;
    console.log(mcps);
    navigate(url, { state: { info: mcps[index] } });
  };

  useEffect(() => {
    let adds = [];
    axios
      .get(`http://localhost:3000/api/mcp?route_id=${id}&week=11&month=12`)
      .then((res) => {
        setMcps(res.data);
      })
      .then(() => {
        mcps?.map((mcp) => {
          axios
            .get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${mcp.address}.json?access_token=pk.eyJ1IjoibWFwdGVzdHR0dHR0dCIsImEiOiJjbGIyajBvcnYwNHU2M29wY3Zsc3loa3JyIn0.rTklVzpwyl1ckew09uFPSQ`
            )
            .then((res) => {
              adds.push({
                longitude: res?.data?.features[0].center[0],
                latitude: res?.data?.features[0].center[1],
              });
            })
            .then(() => {
              setMarkers(adds);
            });
        });
      });
  }, []);

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row">
        <div className="col-8" style={{ height: "100vh" }}>
          <ReactMapGL
            initialViewState={{
              latitude: 10.762622,
              longitude: 106.660172,
              zoom: 5,
            }}
            style={{ width: "100%", height: "100vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken="pk.eyJ1IjoibWFwdGVzdHR0dHR0dCIsImEiOiJjbGIyajBvcnYwNHU2M29wY3Zsc3loa3JyIn0.rTklVzpwyl1ckew09uFPSQ"
            onMove={(viewport) => setViewport(viewport)}
          >
            {markers.map((marker) => (
              <Marker latitude={marker.latitude} longitude={marker.longitude} />
            ))}
          </ReactMapGL>
        </div>
        <div className="col-4" style={{ paddingTop: "30px" }}>
          <h1 className="header-text">CÁC MCPs TRÊN TUYẾN ĐƯỜNG TĐ/LT</h1>
          <Table>
            <thead>
              <tr>
                <th></th>
                {theads.map((thead, index) => (
                  <th key={index}>{thead.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mcps?.map((mcp, index) => (
                <tr
                  key={index}
                  className="link"
                  onClick={() => {
                    mcp.janiator.split("/")[0] === mcp.janiator.split("/")[1]
                      ? void 0
                      : handleJanitorsList(mcp.mcpID, index);
                  }}
                >
                  {mcp.janiator.split("/")[0] === mcp.janiator.split("/")[1] ? (
                    <td>
                      <img src={require("../../img/checkcircle.png")} />
                    </td>
                  ) : (
                    <td>
                      <img src={require("../../img/crosscircle.png")} />
                    </td>
                  )}
                  <td>{mcp.mcpID}</td>
                  <td>{mcp.address}</td>
                  <td>{mcp.janiator}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            variant="dark"
            onClick={() => navigate(-1)}
            style={{ float: "right" }}
          >
            Quay về
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MCPsList;
