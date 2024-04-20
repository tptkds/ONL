'use client';
// pages/admin/upload-movies.js
import React, { useState } from 'react';
import Papa from 'papaparse';
import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const UploadMovies = () => {
    // 상태를 추가하여 업로드 진행 상황을 추적할 수 있습니다.
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = (event: any) => {
        setIsUploading(true);
        const file = event.target.files[0];

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (result: any) => {
                const movies = result.data;
                const moviesToUpload = movies.filter(
                    (movie: any) => movie.genres && movie.genres.trim() !== ''
                );

                try {
                    // 각 영화 데이터를 파싱하고 업로드합니다.
                    for (const movie of moviesToUpload) {
                        const {
                            title,
                            award,
                            tmdbId,
                            genres,
                            posterPath,
                            director,
                            release_date,
                            overview,
                        } = movie;

                        const genresArray = movie.genres
                            ? movie.genres
                                  .split(',')
                                  .map((genre: any) => genre.trim())
                            : [];

                        // Firestore 업데이트 로직

                        const awardsDocRef = doc(db, 'Awards', 'Venice');

                        const result = await setDoc(
                            awardsDocRef,
                            {
                                '2023': moviesToUpload.map((movie: any) => ({
                                    title: movie.title,
                                    award: movie.award,
                                    tmdbId: movie.tmdbId,
                                    genres: movie.genres
                                        .split(',')
                                        .map((genre: any) => genre.trim()),
                                    posterPath: movie.posterPath,
                                    director: movie.director,
                                    release_date: movie.release_date,
                                    overview: movie.overview,
                                })),
                            },
                            { merge: true }
                        );
                    }
                    console.dir(result);

                    alert('모든 영화 데이터가 성공적으로 업로드되었습니다.');
                } catch (error) {
                    console.error('Error uploading movies: ', error);
                    alert('영화 데이터 업로드에 실패했습니다.');
                } finally {
                    setIsUploading(false);
                }
            },
        });
    };

    return (
        <div>
            <h1>영화 데이터 업로드</h1>
            <input
                type="file"
                accept=".csv"
                onChange={handleUpload}
                disabled={isUploading}
            />
            {isUploading && <p>업로드 중...</p>}
        </div>
    );
};

export default UploadMovies;
