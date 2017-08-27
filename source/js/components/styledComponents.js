import styled from 'styled-components';
import Select from 'react-select';

export const StyledSelect = styled(Select)`
.Select-control {
    border-radius: 0px;
    font-size: 1.6rem;
  }
 .Select-arrow-zone {
    padding: 0px;
    -webkit-appearance: none;
  }
  .Select-option {
    font-size: 1.6rem;
  }
  .Select-option.is-focused {
  background-color: #6f6072;
  color: #fff;
  font-size: 1.6rem;
}
.Select-clear-zone {
  display: none;
}
.Select-option.is-selected {
  background-color: #d3cfd4
}
&.is-focused:not(.is-open) > .Select-control {
  border-color: #6f6072;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(111, 96, 114, 0.3);

}
`;
export const StyledMultiSelect = styled(Select)`
  .Select-control {
    border-radius: 0px;
  }
  &.Select--multi  {
    .Select-value-icon:hover{
      background-color: #6f6072;
      color: #dbd7dc;
    }
    .Select-value {
      display: inline-flex;
      align-items: center;
      background-color: #4C3950;
      color: #fff;
    }   
  }
  .Select-arrow-zone {
    padding: 0px;
    -webkit-appearance: none;
  }
  .Select-option.is-focused {
  background-color: #6f6072;
  color: #fff;
}
.Select-option.is-selected {
  background-color: #d3cfd4
}
&.is-focused:not(.is-open) > .Select-control {
  border-color: #6f6072;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px rgba(111, 96, 114, 0.3);
}
  }`;
