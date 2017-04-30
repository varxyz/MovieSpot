import React, { PropTypes } from 'react';
import ListItem from 'components/ListItem';
import { Column, GridRow } from 'components/Grid/';
import { Link } from 'react-router';
import { Card } from 'semantic-ui-react';

function PopularPeople({ error, people }) {
  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <div component={ErrorComponent} />;
  }
  if (people) {
    const name = people.results
      .map((item, index) => (
        <Column mobile={4} computer={1} key={`item-${index}`}>
          <Link to={`/name/${item.id}`}>
            <Card
              className="pt-card pt-interactive pt-elevation-1"
              image={`https://image.tmdb.org/t/p/w185/${item.profile_path}`}
            />
          </Link>
        </Column>
      ))
      .slice(0, 16);
    return (
      <GridRow columns={12}>
        {name}
      </GridRow>
    );
  }

  return null;
}

PopularPeople.propTypes = {
  error: PropTypes.any,
  people: PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

export default PopularPeople;
