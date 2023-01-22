const express = require("express");
const { Shoe, Variant, Brand, Gender, Material, Color, Size } = require('../models')

//getall brand,gender,Material,color,size

async function getAllBrands() {
    const allBrands = await Brand.fetchAll().map(each => {
        return [each.get("id"), each.get("brand")];
    })
    return allBrands;
}

async function getAllGenders() {
    const allGenders = await Gender.fetchAll().map(each => {
        return [each.get("id"), each.get("gender")];
    })
    return allGenders;
}

async function getAllMaterials() {
    const allMaterial = await Material.fetchAll().map(each => {
        return [each.get("id"), each.get("materials")];
    })
    return allMaterial;
}
async function getAllColors() {
    const allColors = await Color.fetchAll().map(each => {
        return [each.get("id"), each.get("color")];
    })
    return allColors;
}
async function getAllSize() {
    const allSize = await Size.fetchAll().map(each => {
        return [each.get("id"), each.get("size")];
    })
    return allSize;
}

async function getVariantByIdwithProduct(productId) {
    const variant = await Variant.where({
        'shoe_id': productId
    }).fetchAll(
        {
            require: false,
            withRelated: ['color', 'size']
        }
    )
    return variant;
}

async function getVariantById(productId) {
    const variant = await Variant.where({
        'id': productId
    }).fetch(
        {
            require: false,
            withRelated: ['color', 'size', 'shoe']
        }
    )
    return variant;
}

async function getProductById(productId) {
    const product = await Shoe.where({
        "id": productId
    }).fetchAll(
        {
            withRelated: ['brand', 'gender', 'materials', 'variants', 'variants.color', 'variants.size']
        }
    )
    return product;
}

async function getVariantAndProductViaParams(product_Id) {
    const productId = req.params.product_id;

    const shoe = await Shoe.where({
        "id": productId
    }).fetch(
        {
            withRelated: ['brand', 'gender', 'materials']
        }
    )
    // console.log(shoe);
    let variantDisplay = await Variant.where({
        'shoe_id': productId
    }).fetchAll(
        {
            require: false,
            withRelated: ['color', 'size']
        }
    )
    return shoe;
}
async function updateVariant(variantId, data) {
    const variant = await getVariantById(variantId);
    if (!variant) {
        return;
    }
    variant.set(data);
    await variant.save();
    return true
};

async function getAllProducts(variantId, data) {
    const allProducts = await Shoe.fetchAll({
        withRelated: ["gender", "brand", "materials"],
    });;

    return allProducts
};
// const getAllProducts = async () => {
//     return await Shoe.fetchAll({
//       withRelated: ["brand", "materials"],
//     });
//   };


const searchShoes = async (search) => {
    let query = Shoe.collection();
    // console.log(search);
    if (search.model) {
        
            query.where('model', 'like', `%${search.model}%`);
        
    }
    if (search.description) {
        
            query.where('description', 'like', `%${search.description}%`);
        
    }
    if (search.shoeType) {
        
            query.where('shoe_type', 'like', `%${search.shoeType}%`);
       
        
        
    }
    if (search.brand_id && search.brand_id != 0) {
        query.where('brand_id', '=', search.brand_id);
    }
    
    if (search.gender_id && parseInt(search.gender_id) != 0) {
        query.where('gender_id', '=', search.gender_id);
    }
    if (search.brand_id && search.brand_id != 0) {
        query.where('brand_id', '=', search.brand_id);
    }

    if (search.materials && search.materials != 0) {
        // ...JOIN products_tags ON products.id = products_tags.product_id
        query.query('join', 'materials_shoes', 'shoes.id', 'shoe_id')
            .where('material_id', 'in', search.materials.split(','))
    }

    const searchShoes = (await query.fetch({
        withRelated: ['gender', 'brand', 'materials'] // for each product, load in each of the tag
    })).toJSON();
    // console.log(searchShoes)
    return searchShoes;



}
module.exports =
{
    getAllBrands,
    getAllGenders,
    getAllColors,
    getAllSize,
    getProductById,
    getVariantById,
    getAllMaterials,
    getVariantByIdwithProduct,
    updateVariant,
    getAllProducts,
    searchShoes
}