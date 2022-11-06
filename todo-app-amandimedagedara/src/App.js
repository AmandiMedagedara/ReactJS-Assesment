import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import './App.css';
import './styles.scss';
import axios from 'axios';

import ScrollView from 'devextreme-react/scroll-view';
import ReactPaginate from 'react-paginate';
import { Form, GroupItem, TabbedItem, Tab, TabPanelOptions, SimpleItem } from 'devextreme-react/form';
import PieChart, { Series, Label, Connector, Size, Export, } from 'devextreme-react/pie-chart';
import TabPanel, { Item } from "devextreme-react/tab-panel";

import Avatar1 from './assets/Avatar-1.svg';
import Avatar2 from './assets/Avatar-2.svg';
import Notification from './assets/Notifications.svg';
import downArrow from './assets/Chevron-down.svg';
import profile from './assets/Profile.svg';

import { priorities } from './data.js';

function App() {

  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState('');
  const [inProgressTodos, setInprogressTodos] = useState('');
  const [itemOffset, setItemOffset] = useState(0);
  const scrollViewRef = useRef();

  useEffect(() => {
    getAllTodos();
  }, []);


  const getAllTodos = () => {
    axios.get("https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do")
      .then((response) => {
        const allTodos = response.data
        console.log(allTodos)
        setTodos(allTodos)

        const completedTodoList = allTodos.filter(allTodos => allTodos.completed === true)
        setCompletedTodos(completedTodoList)

        const todoListInProgress = allTodos.filter(allTodos => allTodos.completed === false)
        setInprogressTodos(todoListInProgress)

        const high = allTodos.filter(allTodos => allTodos.priority === 'HIGH')
        console.log(high)

        const low = allTodos.filter(allTodos => allTodos.priority === 'LOW')
        console.log(low)

        const medium = allTodos.filter(allTodos => allTodos.priority === 'MEDIUM')
        console.log(medium)
      })
      .catch(error => console.log(error));
  }

  const scrollViewStyle = { height: 'calc(100vh - 113px)' };

  return (
    <div>
      <div>
        <div className='row'>
          <div className="col col-lg-2 col-md-5">
            <div>
              <div className='container'>
                <h5 className='p-3'>Acmy Solutions</h5>
              </div>
              <div className='container1'>
                <h5 className='p-3'>Dashboard</h5>
              </div>
            </div>
          </div>
          <div className="col col-lg-10 col-md-8">
            <div className='container2'>
              <div className='row'>
                <div className="col col-lg-10 col-md-10">
                  <h5 className='p-3'>Dashboard</h5>
                </div>
                <div className="col col-lg-2 col-md-2">
                  <img src={Notification} className='p-1' />
                  <img src={profile} className='p-1' />
                  <img src={downArrow} className='p-1' />
                </div>
              </div>
            </div>
            <div className='form-control'>
              <h5>Welcome back, John Doe</h5>
              <p>The end of the year is coming. Are you planning your year performance interviews? You can do this super efficiently with Acmy.</p>
              <a href="https://github.com/AmandiMedagedara" target='blank'>Look here for more information</a>
            </div>
            <div className='row'>
              <div className="col col-lg-7 col-md-7">
                <div className='form-control mt-2'>
                  <h5>Tasks</h5>
                  <TabPanel
                    animationEnabled={true}
                    swipeEnabled={true}>
                    <Item title='Completed Todos' icon="check">
                      <div className='scrollview' >

                        {completedTodos ?
                          completedTodos.map(completedTodos => {
                            return (
                              <div key={completedTodos.id} className='form-control'>
                                {/* <img src={Notification}/> */}
                                <ul><li>{completedTodos.todo}</li></ul>
                              </div>
                            )
                          }) : <p>No data yet</p>}
                      </div>
                    </Item>
                    <Item title='Todos In Progress' icon="clock">
                      <div className='scrollview'>
                        {inProgressTodos ?
                          inProgressTodos.map(inProgressTodos => {
                            return (
                              <div key={inProgressTodos.id} className='form-control'>
                                {/* <img src={Notification}/> */}
                                <ul><li>{inProgressTodos.todo}</li></ul>
                              </div>
                            )
                          }) : <p>No data yet</p>}
                      </div>
                    </Item>
                  </TabPanel>
                </div>
              </div>
              <div className="col col-lg-5 col-md-5">
                <div className='form-control mt-2'>
                  <h5>Activity Feed</h5>
                  <div className='row'>
                    <div className="col col-lg-1 col-md-2">
                      <img src={Avatar1} />
                    </div>
                    <div className="col col-lg-11 col-md-10">
                      <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
                      <p>Sep 16, 2022 at 11.30 PM</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col col-lg-1 col-md-2">
                      <img src={Avatar2} />
                    </div>
                    <div className="col col-lg-11 col-md-10">
                      <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
                      <p>Sep 17, 2022 at 1.30 PM</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className="col col-lg-1 col-md-2">
                      <img src={Avatar2} />
                    </div>
                    <div className="col col-lg-11 col-md-10">
                      <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h6>
                      <p>Sep 17, 2022 at 1.30 PM</p>
                    </div>
                  </div>
                </div>
                <div className='form-control mt-2'>
                  <h5>Tasks Priorities</h5>
                  <div>
                    <PieChart
                      id="pie"
                      dataSource={priorities}
                      palette="Bright"
                      height={200}
                    // title="Area of Countries"
                    >
                      <Series
                        argumentField="priority"
                        valueField="area"
                      >
                      </Series>
                      <Size width={300} />

                    </PieChart>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;