import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import {
  Button,
  CardBody,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from 'reactstrap';

import Validators from 'scbl-lib/validators';

import { BanListSelector } from '../';

const schema = yup.object().shape(Validators.ExportBanListConfig);

export default function (props) {
  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      banList: null,
      activePoints: 3,
      expiredPoints: 1
    }
  });

  return (
    <>
      <CardBody>
        <Form onSubmit={handleSubmit(props.onSubmit)}>
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label>Ban List</Label>
                <Controller
                  name="banList"
                  control={control}
                  render={(props) => (
                    <BanListSelector
                      onChange={(e) => props.onChange(e.target.value)}
                      checked={props.value}
                      invalid={errors.banList?.message}
                    />
                  )}
                />
                <FormText>Please select a ban list to apply the custom points values to.</FormText>
                <FormFeedback>{errors.banList?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label>Number of points for active bans</Label>
                <Input
                  type="number"
                  innerRef={register}
                  name="activePoints"
                  invalid={errors.activePoints?.message}
                />
                <FormText>
                  Please provide a number of points a player gets for each active ban in the
                  specified ban list.
                </FormText>
                <FormFeedback>{errors.activePoints?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label>Number of points for expired bans</Label>
                <Input
                  type="number"
                  innerRef={register}
                  name="expiredPoints"
                  invalid={errors.expiredPoints?.message}
                />
                <FormText>
                  Please provide a number of points a player gets for each expired ban in the
                  specified ban list.
                </FormText>
                <FormFeedback>{errors.expiredPoints?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="12" className="text-center">
              <Button color="info">Add</Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </>
  );
}
