import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
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

import { ExportBanListConfigs } from '../';

const schema = yup.object().shape(Validators.ExportBanList);

export default function (props) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.exportBanList || {
      type: 'remote',
      threshold: 9,
      defaultActivePoints: 3,
      defaultExpiredPoints: 1
    }
  });

  return (
    <>
      <CardBody>
        <Form onSubmit={handleSubmit(props.onSubmit)}>
          <Row>
            <Col xs="12">
              <FormGroup>
                <Label>Name</Label>
                <Input type="text" innerRef={register} name="name" invalid={errors.name?.message} />
                <FormText>
                  Please provide a name for your export ban list so it can be identified in the
                  future.
                </FormText>
                <FormFeedback>{errors.name?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="12">
              <FormGroup>
                <Label>Community/Server Name</Label>
                <Input
                  type="text"
                  innerRef={register}
                  name="server"
                  invalid={errors.server?.message}
                />
                <FormText>
                  Please provide us with the name of your community/server so we can see who is
                  using SCBL.
                </FormText>
                <FormFeedback>{errors.server?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="12">
              <FormGroup>
                <Label>Type</Label>
                <Input type="select" innerRef={register} name="type" invalid={errors.type?.message}>
                  <option value="remote">Remote</option>
                  <option value="battlemetrics">Battlemetrics</option>
                </Input>
                <FormText>
                  Please select an export ban list type. Export ban lists can either be imported as
                  a remote ban list or shared with you via Battlemetrics.
                </FormText>
                <FormFeedback>{errors.server?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="12">
              <FormGroup>
                <Label>Threshold</Label>
                <Input
                  type="number"
                  innerRef={register}
                  name="threshold"
                  invalid={errors.threshold?.message}
                />
                <FormText>
                  Please provide a threshold for your export ban list. Once the sum of the points
                  for a player's bans exceeds this number they will be added to your export ban
                  list.
                </FormText>
                <FormFeedback>{errors.threshold?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label>Default number of points for active bans</Label>
                <Input
                  type="number"
                  innerRef={register}
                  name="defaultActivePoints"
                  invalid={errors.defaultActivePoints?.message}
                />
                <FormText>
                  Please provide a default number of points a player gets for each active ban.
                </FormText>
                <FormFeedback>{errors.defaultActivePoints?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="6">
              <FormGroup>
                <Label>Default number of points for expired bans</Label>
                <Input
                  type="number"
                  innerRef={register}
                  name="defaultExpiredPoints"
                  invalid={errors.defaultExpiredPoints?.message}
                />
                <FormText>
                  Please provide a default number of points a player gets for each expired ban.
                </FormText>
                <FormFeedback>{errors.defaultExpiredPoints?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="12" className="text-center">
              {!props.exportBanList && (
                <p className="mt-2">
                  You will be able to configure the number of points for each ban list independently
                  once the export ban list has been created.
                </p>
              )}
              <Button color="info">Save</Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
      {props.exportBanList && <ExportBanListConfigs exportBanListID={props.exportBanList.id} />}
    </>
  );
}
