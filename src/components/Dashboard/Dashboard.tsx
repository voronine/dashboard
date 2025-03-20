import React from 'react';
import { Table, Row, Col, Button, Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useFetchUsers } from '../../hooks/useFetchUsers';
import { logout } from '../../redux/slices/aythSlice';
import '../../styles/Dashboard.scss';

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const { users, loading } = useFetchUsers();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logout());
  };

  const columns = [
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
  ];

  return (
    <Layout>
      <Content className="dashboard-container" style={{ padding: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className="user-details">
              <div className="user-info-wrapper">
                {authUser?.image && (
                  <img 
                    src={authUser.image} 
                    alt="Profile" 
                    className="user-avatar" 
                  />
                )}

                <div className="user-info">
                  <p><strong>First Name:</strong> {authUser?.firstName}</p>

                  <p><strong>Last Name:</strong> {authUser?.lastName}</p>

                  <p><strong>Email:</strong> {authUser?.email}</p>
                </div>
              </div>

              <Button className="logout-btn" type="default" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Col>
          
          <Col span={24}>
            <Table
              dataSource={users}
              columns={columns}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
