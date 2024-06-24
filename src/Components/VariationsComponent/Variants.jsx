import React, { useEffect } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { attributesSelector, fetchAttributes } from '../../Apis/Getters/attributes';

const Variants = ({ onAttributesChange, onVariationChance, onCombinationChange }) => {

    // USING DISPACHER HOOK
    const dispatch = useDispatch();
    useEffect(() => {
        // FETCHING ALL ATTRIBUTES
        const token = window.sessionStorage.getItem("access-vs");
        dispatch(fetchAttributes(token));
    }, []);

    // SELECTED ATTRIBUTES STATE FROM PARENT COMPONENT
    const [selectedAttributes, setSelectedAttributes] = onAttributesChange;
    // INPUT VARIATIONS STATE FROM PARENT COMPONENT
    const [variations, setVariations] = onVariationChance;
    // VARIANTS INPUT DATA STATE FROM PARENT COMPONENT
    const [Combinations, setCombinations] = onCombinationChange;

    // SELECTING ALL ATTRIBUTES FROM REDUX STATE
    const options = useSelector(state => attributesSelector.selectAll(state)).map(elem => {
        return (
            {
                label: elem.name,
                value: elem.name
            }
        );
    });

    // HANDLING INPUT ATTRIBUTES 
    const handleChange = (value) => {
        setSelectedAttributes(value);
        setVariations([])
        setCombinations({})
    };

    // HANDLING VARIATIONS INPUT
    const handleVariations = (elem, e) => {
        // const { name, value } = e.target;
        setVariations({
            ...variations,
            [elem]: e
        });
        setCombinations({});
    };

    // HANDLING VARIANTS INPUT
    const handleVariants = (e) => {
        const { name, value } = e.target;
        setCombinations({
            ...Combinations,
            [name]: value
        });
    };

    // VARIATIONS OBJECT TO ARRAY CONVERSION
    const variationParts = Object.values(variations);
    // CREATING VARIANTS COMBINATION FROM VARIATIONS
    let multi_variants = [];
    if (variationParts.length && variationParts.length != 1) {
        multi_variants = variationParts.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []));
    };

    // MAPPING VARIATIONS LIST FROM SELECTED ATTRIBUTES
    const variationsList = selectedAttributes.map((elem, index) => {
        return (
            <div className="row my-3" key={index + 1}>
                <div className="col-md-4">
                    {elem}
                </div>
                <div className="col-md-8">
                    <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Add values"
                        onChange={(e) => {
                            handleVariations(elem, e)
                        }}
                        value={Object.values(variations)[index]}
                    />
                </div>
            </div>
        );
    });

    // MAPPING VARIANT COMBINATIONS ACCORDING NO. OF ATTRIBUTES SELECTED
    let variantsList = [];
    if (selectedAttributes.length > 1) {
        // MAPPING VARIANT COMBINATIONS IF ATTRIBUTES > 1
        variantsList = multi_variants.map((elem, index) => {
            // CREATING COMBINATIONS
            const combo = elem.reduce((total, currentValue) => {
                return (
                    `${total}-${currentValue}`
                )
            });
            // SELECTING VALUES OF PRICE & QUANTITY FROM Combinations STATE
            const price = Combinations['price_' + combo] ? Combinations['price_' + combo] : '';
            const quantity = Combinations['quantity_' + combo] ? Combinations['quantity_' + combo] : '';

            return (
                <div className="row my-3" key={index + 1}>
                    <div className="col-md-4">
                        {combo}
                    </div>
                    <div className="col-md-4">
                        <input type="number" name={'price_' + combo} className="form-control" placeholder='Enter Price' value={price} onChange={handleVariants} required />
                    </div>
                    <div className="col-md-4">
                        <input type="number" name={'quantity_' + combo} className="form-control" placeholder='Enter Quantity' value={quantity} onChange={handleVariants} required />
                    </div>
                </div>
            );
        });
    } else {
        // MAPPING VARIANTS IF 1 ATTRIBUTES
        variantsList = variationParts.length
            ?
            variationParts[0].map((elem, index) => {
                // SELECTING VALUES OF PRICE & QUANTITY FROM Combinations STATE
                const price = Combinations['price_' + elem] ? Combinations['price_' + elem] : '';
                const quantity = Combinations['quantity_' + elem] ? Combinations['quantity_' + elem] : '';
                return (
                    <div className="row my-3" key={index + 1}>
                        <div className="col-md-4">
                            {elem}
                        </div>
                        <div className="col-md-4">
                            <input type="number" name={'price_' + elem} className="form-control" placeholder='Enter Price' value={price} onChange={handleVariants} required />
                        </div>
                        <div className="col-md-4">
                            <input type="number" name={'quantity_' + elem} className="form-control" placeholder='Enter Quantity' value={quantity} onChange={handleVariants} required />
                        </div>
                    </div>
                );
            })
            :
            '';
    };

    return (
        <React.Fragment>
            <div className="card mt-5">
                <div className="card-body p-md-5">
                    <div className="mb-5">
                        <h4 className="mb-0 fs-exact-18">Variations</h4>
                    </div>
                    <div className="row g-4 mb-4">
                        <div className="col-md-12">
                            <label className="form-label">
                                Attributes :
                            </label>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                // defaultValue={['a10', 'c12']}
                                onChange={handleChange}
                                options={options}
                                value={selectedAttributes}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">
                                Variations :
                            </label>
                            {variationsList}

                        </div>
                        <div className="col-md-12">
                            <label className="form-label">
                                Variants:
                            </label>
                            {variantsList}

                        </div>
                    </div>

                </div>
            </div>

        </React.Fragment>
    );
};

export default Variants;