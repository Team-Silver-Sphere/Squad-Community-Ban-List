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
      defaultExpiredPoints: 1,
      maxBanAge: 0
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
                <Input
                  type="text"
                  innerRef={register}
                  name="name"
                  invalid={!!errors.name?.message}
                />
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
                  invalid={!!errors.server?.message}
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
                <Input
                  type="select"
                  innerRef={register}
                  name="type"
                  invalid={errors.type?.message}
                  disabled={props.exportBanList}
                >
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
                  invalid={!!errors.threshold?.message}
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
                  invalid={!!errors.defaultActivePoints?.message}
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
                  invalid={!!errors.defaultExpiredPoints?.message}
                />
                <FormText>
                  Please provide a default number of points a player gets for each expired ban.
                </FormText>
                <FormFeedback>{errors.defaultExpiredPoints?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="12">
              <FormGroup>
                <Label>Max Ban Age (in Days) - CURRENTLY HAS NO AFFECT</Label>
                <Input
                  type="text"
                  innerRef={register}
                  name="maxBanAge"
                  invalid={!!errors.maxBanAge?.message}
                />
                <FormText>
                  Please provide a max age for bans in days. Once a ban exceeds this age they will contribute no points to a player's total. Use 0 to ignore ban age.
                </FormText>
                <FormFeedback>{errors.maxBanAge?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="12">
              <FormGroup>
                <Label>Discord Webhook (Optional)</Label>
                <Input
                  type="text"
                  innerRef={register}
                  name="discordWebhook"
                  invalid={!!errors.discordWebhook?.message}
                />
                <FormText>
                  You may supply a Discord webhook address in order to receive updates when players
                  are added or removed from your export ban list.
                </FormText>
                <FormFeedback>{errors.discordWebhook?.message}</FormFeedback>
              </FormGroup>
            </Col>
            <Col xs="12" className="text-center">
              <Button color="info">Save</Button>
            </Col>
            <Col xs="12" className="">
              <p className="mt-4">
                Bans are not immediately added to export ban lists after creation or modification.
                Instead, they will be added when our database is next synchronised with our partner
                organisations' ban lists.
              </p>
              {!props.exportBanList && (
                <p>
                  You will be able to configure the number of points for each ban list independently
                  once the export ban list has been created.
                </p>
              )}
            </Col>
          </Row>
        </Form>
      </CardBody>
      {props.exportBanList && <ExportBanListConfigs exportBanListID={props.exportBanList.id} />}
    </>
  );
}
