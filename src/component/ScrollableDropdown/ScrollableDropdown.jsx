import PropTypes from 'prop-types';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './ScrollableDropdown.css';

const ScrollableDropdown = ({ items, defaultText, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(defaultText);

  const handleSelect = (item) => {
    setSelectedItem(item.label); // Update the button text
    if (onSelect) {
      onSelect(item); // Optional: Call the onSelect callback if provided
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {selectedItem} {/* Display the currently selected item */}
      </Dropdown.Toggle>

      <Dropdown.Menu
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
        {items.length > 0 ? (
          <>
            {/* First item with a line underneath */}
            <Dropdown.Item
              key={0}
              onClick={() => handleSelect(items[0])}
              className="first-item"
            >
              {items[0].label}
            </Dropdown.Item>
            <div className="dropdown-divider"></div> {/* Line divider */}
            {/* Remaining items */}
            {items.slice(1).map((item, index) => (
              <Dropdown.Item
                key={index + 1}
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </Dropdown.Item>
            ))}
          </>
        ) : (
          <Dropdown.Item disabled>No items available</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

ScrollableDropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultText: PropTypes.string,
  onSelect: PropTypes.func,
};

ScrollableDropdown.defaultProps = {
  defaultText: 'Select from here',
  onSelect: null,
};

export default ScrollableDropdown;
