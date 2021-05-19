import classnames from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

export default function SteamUserSearchBox(props) {
  const [search, setSearch] = useState(props.search || '');

  const router = useRouter();

  return (
    <div className={classnames(props.frontpageVersion ? 'shadow' : '', props.className)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          await router.push(`/search/${search}`);
        }}
      >
        <FormGroup>
          <InputGroup
            className={classnames({
              'input-group-alternative': props.frontpageVersion,
              'is-invalid': search !== '' && !search.match(/^[0-9]{17}$/)
            })}
          >
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="fa fa-search" />
              </InputGroupText>
            </InputGroupAddon>

            <Input
              type="text"
              placeholder="Steam 64 ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <InputGroupAddon addonType="prepend">
              <Button
                className="rounded-right shadow-none"
                color="primary"
                disabled={search !== '' && !search.match(/^[0-9]{17}$/)}
              >
                Search
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <FormFeedback>A valid Steam 64 ID is a 17 digit number.</FormFeedback>
        </FormGroup>
      </Form>
    </div>
  );
}
