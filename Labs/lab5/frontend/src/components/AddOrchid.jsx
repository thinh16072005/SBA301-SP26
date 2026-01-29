// `frontend/src/components/AddOrchid.jsx`
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";

export default function AddOrchid() {
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_URL;
    const categoriesEndpoint = baseUrl?.replace(/\/orchids(\/)?$/, "/categories") ?? "/categories";

    const [loading, setLoading] = useState(true);
    const [submitError, setSubmitError] = useState("");
    const [categories, setCategories] = useState([]);

    const imageOptions = [
        {label: "Cattleya", value: "/orchids/cattleya.png"},
        {label: "Dendrobium", value: "/orchids/dendrobium.png"},
        {label: "Miltonia", value: "/orchids/miltonia.png"},
        {label: "Oncidium", value: "/orchids/oncidium.png"},
        {label: "Paphiopedilum", value: "/orchids/paphiopedilum.png"},
        {label: "Phalaenopsis", value: "/orchids/phalaenopsis.png"},
        {label: "Vanda", value: "/orchids/vanda.png"},
        {label: "Zygopetalum", value: "/orchids/zygopetalum.png"},
    ];

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        reset,
    } = useForm({
        defaultValues: {
            orchidName: "",
            orchidDescription: "",
            orchidUrl: "",
            categoryId: "",
            isNatural: false,
            isAttractive: false,
        },
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const {data} = await axios.get(categoriesEndpoint);
                setCategories(Array.isArray(data) ? data : []);
            } catch (e) {
                setCategories([]);
                setSubmitError("Unable to load categories.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [categoriesEndpoint]);

    const onSubmit = async (formData) => {
        try {
            setSubmitError("");
            await axios.post(baseUrl, {
                orchidName: formData.orchidName,
                orchidDescription: formData.orchidDescription,
                orchidUrl: formData.orchidUrl,
                categoryId: Number(formData.categoryId),
                isNatural: Boolean(formData.isNatural),
                isAttractive: Boolean(formData.isAttractive),
            });
            toast.success("Orchid added successfully");
            reset();
            navigate("/");
        } catch (error) {
            toast.error("Create failed");
            setSubmitError("Creating orchid failed. Try again.");
        }
    };

    const previewUrl = watch("orchidUrl");

    if (loading) {
        return <div className="container py-5">Loading...</div>;
    }

    return (
        <section className="container py-4">
            <header className="d-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0">Add Orchid</h1>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </header>

            {submitError && (
                <div className="alert alert-danger" role="alert">
                    {submitError}
                </div>
            )}

            <form className="row g-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input
                        className="form-control"
                        {...register("orchidName", {required: "Name is required"})}
                    />
                    {errors.orchidName && (
                        <small className="text-danger">{errors.orchidName.message}</small>
                    )}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
                        {...register("categoryId", {required: "Category is required"})}
                    >
                        <option value="">Choose...</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && (
                        <small className="text-danger">{errors.categoryId.message}</small>
                    )}
                </div>

                <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea
                        rows={4}
                        className="form-control"
                        {...register("orchidDescription", {required: "Description is required"})}
                    />
                    {errors.orchidDescription && (
                        <small className="text-danger">{errors.orchidDescription.message}</small>
                    )}
                </div>

                <div className="col-md-6">
                    <label className="form-label">Orchid Image</label>
                    <select
                        className="form-select"
                        {...register("orchidUrl", {required: "Image is required"})}
                    >
                        <option value="">Choose...</option>
                        {imageOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.orchidUrl && (
                        <small className="text-danger">{errors.orchidUrl.message}</small>
                    )}
                </div>

                <div className="col-md-6 d-flex align-items-center justify-content-center">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="img-fluid rounded"
                            style={{maxHeight: 160}}
                        />
                    ) : (
                        <span className="text-muted">Select an image to preview</span>
                    )}
                </div>

                <div className="col-md-6">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" {...register("isNatural")} />
                        <label className="form-check-label">Natural species</label>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" {...register("isAttractive")} />
                        <label className="form-check-label">Attractive highlight</label>
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Create
                    </button>
                </div>
            </form>
        </section>
    );
}