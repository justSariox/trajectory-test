import { useEffect } from 'react';
import { Form, Input, InputNumber } from 'antd';

import type { Vehicle } from "../../../types/vehicle.ts";
import { useVehicleActions } from "@hooks/useVehicleActions.ts";
import { Modal } from "@components/common";
import { FORM_RULES } from "@utils/constants.ts";
import './VehicleForm.css';

interface VehicleFormProps {
  visible: boolean;
  onClose: () => void;
  vehicle?: Vehicle;
}

export const VehicleForm= ({ visible, onClose, vehicle }: VehicleFormProps) => {
  const [form] = Form.useForm();
  const { addVehicle, updateVehicle } = useVehicleActions();

  useEffect(() => {
    if (visible) {
      if (vehicle) {
        form.setFieldsValue(vehicle);
      } else {
        form.resetFields();
      }
    }
  }, [visible, vehicle, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (vehicle) {
        updateVehicle(vehicle.id, { name: values.name, price: values.price });
      } else {
        addVehicle(values);
      }
      onClose();
    } catch (error) {
      console.error('Ошибка валидации формы:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
      <Modal
          open={visible}
          title={vehicle ? '✏️ Редактировать автомобиль' : '🚗 Добавить автомобиль'}
          onOk={handleSubmit}
          onCancel={handleCancel}
          okText="Сохранить"
          cancelText="Отмена"
          afterClose={() => form.resetFields()}
          width={500}
      >
        <Form form={form} layout="vertical" className="vehicle-form">
          <Form.Item name="name" label="Название" rules={FORM_RULES.name}>
            <Input placeholder="Введите название автомобиля" />
          </Form.Item>

          {!vehicle && (
              <>
                <Form.Item name="model" label="Модель" rules={FORM_RULES.model}>
                  <Input placeholder="Введите модель автомобиля" />
                </Form.Item>
                <Form.Item name="year" label="Год выпуска" rules={FORM_RULES.year}>
                  <InputNumber
                      min={1900}
                      max={2100}
                      placeholder="Выберите год выпуска"
                      className="full-width"
                  />
                </Form.Item>
                <Form.Item name="color" label="Цвет" rules={FORM_RULES.color}>
                  <Input
                      type="color"
                      className="color-picker"
                  />
                </Form.Item>
              </>
          )}

          <Form.Item name="price" label="Цена ($)" rules={FORM_RULES.price}>
            <InputNumber
                min={0}
                step={100}
                placeholder="Введите цену автомобиля"
                className="full-width"
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </Form.Item>
        </Form>
      </Modal>
  );
};