import { useEffect, useState } from 'react';
import { Alert, Col, Layout, Row } from 'antd';

import { Button } from "@components/common";
import { VehicleForm, VehicleMap, VehicleTable } from "@components/Vehicle";
import { useVehicles } from "@hooks/useVehicles";
import type { Vehicle } from "./types/vehicle.ts";

import './App.css';


const { Header, Content } = Layout;

const App = () => {
    const { loading, error, fetchVehicles } = useVehicles();
    const [formVisible, setFormVisible] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle>();

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleEdit = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle);
        setFormVisible(true);
    };

    const handleAdd = () => {
        setEditingVehicle(undefined);
        setFormVisible(true);
    };

    const handleCloseForm = () => {
        setFormVisible(false);
        setEditingVehicle(undefined);
    };

    return (
        <Layout className="custom-app">
            <Header className="custom-header">
                <h1>Trajectory test</h1>
            </Header>
            <Content className="app-content">
                {error && (
                    <Alert
                        className="custom-alert"
                        type="error"
                        message={error}
                        closable
                    />
                )}

                <Button
                    onClick={handleAdd}
                    withIcon
                    appearance="primary"
                >
                    + Добавить автомобиль
                </Button>

                {loading ? (
                    <div className="loading-container">
                        <div className="custom-spinner" />
                    </div>
                ) : (
                    <Row gutter={[24, 24]} className="content-grid">
                        <Col xs={24} lg={12}>
                            <VehicleTable onEdit={handleEdit} />
                        </Col>
                        <Col xs={24} lg={12}>
                            <div className="map-container">
                                <VehicleMap />
                            </div>
                        </Col>
                    </Row>
                )}

                <VehicleForm
                    visible={formVisible}
                    onClose={handleCloseForm}
                    vehicle={editingVehicle}
                />
            </Content>
        </Layout>
    );
};

export default App;