import React, { useEffect, useState } from "react";
import { Card, List, message } from "antd";
import { getConnectionList } from "../../actions";
import PeopleListItem from "./PeopleListItem";
import Container from "./Container";

const PeopleList = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [bText, setButtonText] = useState({});
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let response = null;
      try {
        response = await getConnectionList();
        setList(response.data);

        setLoading(false);
      } catch (err) {
        console.log("Something went wrong");
      }
    };
    if (refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [type, refresh]);

  return (
    <Container>
      <Card loading={loading}>
        <List>
          {list.map(user => (
            <List.Item key={user._id}>
              <div style={{ width: "100%" }}>
                <PeopleListItem user={user} bText={bText} />
              </div>
            </List.Item>
          ))}
        </List>
      </Card>
    </Container>
  );
};

export default PeopleList;
